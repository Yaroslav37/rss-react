import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { BrowserRouter } from 'react-router';
import SearchPage from '../../src/components/SearchPage/SearchPage';

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          count: 1,
          results: [
            {
              name: 'Luke Skywalker',
              height: '172',
              mass: '77',
              hair_color: 'blond',
              skin_color: 'fair',
              eye_color: 'blue',
              birth_year: '19BBY',
              gender: 'male',
              url: 'https://swapi.dev/api/people/1/',
            },
          ],
        }),
    })
  )
);

vi.mock('../../src/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => ({
    setItem: vi.fn(),
    getItem: vi.fn(() => 'Luke Skywalker'),
  })),
}));

describe('SearchPage', () => {
  it('should render loading state initially', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });

  it('should render search results after fetch', async () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('should render error message on fetch failure', async () => {
    (fetch as Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
    });
  });
});
