import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardItem from '../../src/components/Main/CardItem';
import { Card } from '../../src/types/types';

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
    url: 'https://swapi.dev/api/people/1/',
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
        <Routes>
          <Route path="/rss-react" element={<CardItem {...mockCard} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172 cm')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77 kg')).toBeInTheDocument();
  });
});
