import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ThemeProvider,
  useTheme,
} from '../../src/components/contexts/ThemeContext';
import { store } from '../../src/store';
import SearchPage from '../../src/components/SearchPage/SearchPage';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { page1data } from '../mockdata';

const handlers = [
  http.get('https://swapi.dev/api/people?page=1', () => {
    console.log('mock full');
    return HttpResponse.json(page1data);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const TestComponent = () => {
  const { theme } = useTheme();
  return <div data-testid="theme">{theme}</div>;
};

describe('SearchPage', () => {
  it('should render search results after fetch', async () => {
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
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('C-3PO')).toBeInTheDocument();
      expect(screen.getByText('R2-D2')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
      expect(screen.getByText('Owen Lars')).toBeInTheDocument();
      expect(screen.getByText('Beru Whitesun lars')).toBeInTheDocument();
      expect(screen.getByText('R5-D4')).toBeInTheDocument();
      expect(screen.getByText('Biggs Darklighter')).toBeInTheDocument();
      expect(screen.getByText('Obi-Wan Kenobi')).toBeInTheDocument();
    });
  });

  it('should toggle theme when ThemeSwitcher button is clicked', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchPage />
            <TestComponent />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getByText('Switch to dark');
    const themeDisplay = screen.getByTestId('theme');
    expect(themeDisplay.textContent).toBe('light');

    fireEvent.click(button);
    expect(themeDisplay.textContent).toBe('dark');
    expect(button.textContent).toBe('Switch to light');

    fireEvent.click(button);
    expect(themeDisplay.textContent).toBe('light');
    expect(button.textContent).toBe('Switch to dark');
  });
});
