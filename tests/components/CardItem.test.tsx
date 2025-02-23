import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardItem from '../../src/components/Main/CardItem';
import { Card } from '../../src/types/types';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { ThemeProvider } from '../../src/components/contexts/ThemeContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/rss-react', search: '?page=1' }),
    useNavigate: () => mockNavigate,
  };
});

describe('CardItem', () => {
  const mockCard: Card = {
    id: 1,
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
  };

  afterEach(() => {
    mockNavigate.mockReset();
  });

  it('should render the card with correct data', () => {
    render(
      <MemoryRouter initialEntries={['/rss-react']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/rss-react" element={<CardItem {...mockCard} />} />
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172 cm')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77 kg')).toBeInTheDocument();
  });
});
