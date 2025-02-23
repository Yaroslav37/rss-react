import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../src/components/contexts/ThemeContext';
import { store } from '../../src/store';
import SearchPage from '../../src/components/SearchPage/SearchPage';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { dartvadermock, page1data } from '../mockdata';

const handlers = [
  http.get('https://swapi.dev/api/people?search=dart+vader', () => {
    return HttpResponse.json(dartvadermock);
  }),
  http.get('https://swapi.dev/api/people?page=2', () => {
    return HttpResponse.json(page1data);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SearchPage', () => {
  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByTitle('Loading')).toBeInTheDocument();
  });

  it('render error message on fetch failure', async () => {
    server.use(
      http.get('https://swapi.dev/api/people?', () => {
        return HttpResponse.error();
      })
    );
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('update search query and reset page on search button click', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Darth Vader' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });
  });

  it('display Flyout when an item is selected', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchPage />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    store.dispatch({
      type: 'selectedItems/toggleItem',
      payload: {
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        mass: '77',
        id: 1,
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Selected Items: 1')).toBeInTheDocument();
    });
  });
});
