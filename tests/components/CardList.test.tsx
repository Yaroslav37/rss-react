import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from '../../src/components/Main/CardList';
import { BrowserRouter } from 'react-router';
import { Card } from '../../src/types/types';

describe('CardList', () => {
  const results: Card[] = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      mass: '77',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Darth Vader',
      gender: 'male',
      height: '202',
      mass: '136',
      url: 'https://swapi.dev/api/people/2/',
    },
  ];

  it('should render correctly with results', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CardList results={results} />
      </BrowserRouter>
    );

    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Darth Vader')).toBeInTheDocument();
  });

  it('renders nothing if given an empty array ', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CardList results={[]} />
      </BrowserRouter>
    );

    expect(getByText(/nothing was found/i)).toBeInTheDocument();
  });
});
