import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from '../../src/components/Main/CardList';
import { BrowserRouter } from 'react-router';
import { Card } from '../../src/types/types';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { ThemeProvider } from '../../src/components/contexts/ThemeContext';

describe('CardList', () => {
  const results: Card[] = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      mass: '77',
      id: 1,
    },
    {
      name: 'Darth Vader',
      gender: 'male',
      height: '202',
      mass: '136',
      id: 2,
    },
  ];

  it(' render correctly with results', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <CardList results={results} />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Darth Vader')).toBeInTheDocument();
  });

  it('renders nothing if given an empty array ', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <CardList results={[]} />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(getByText(/nothing was found/i)).toBeInTheDocument();
  });
});
