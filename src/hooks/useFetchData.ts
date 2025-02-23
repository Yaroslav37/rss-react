import { useState, useCallback } from 'react';
import type { Card } from '../../src/types/types';

interface Hero {
  name: string;
  gender: string;
  height: string;
  mass: string;
  url: string;
}

export const useFetchData = () => {
  const [results, setResults] = useState<Card[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = useCallback(async (searchQuery: string, page: number) => {
    setIsLoading(true);
    try {
      const trimmedSearchValue = searchQuery.trim();
      const baseUrl = 'https://swapi.dev/api/people/';
      const params = new URLSearchParams();

      if (page > 1) params.append('page', page.toString());
      if (trimmedSearchValue) params.append('search', trimmedSearchValue);

      const url = params.toString() ? `${baseUrl}?${params}` : baseUrl;
      console.log(url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Er: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const peopleList: Card[] = data.results.map((hero: Hero) => {
        return {
          name: hero.name,
          gender: hero.gender,
          height: hero.height,
          mass: hero.mass,
          id: hero.url.split('/').slice(-2, -1)[0],
        };
      });
      setResults(peopleList);
      setTotalItems(data.count);
      setErrorMessage(null);
    } catch (error) {
      setResults([]);
      setErrorMessage(`Error fetching data: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { results, errorMessage, isLoading, totalItems, fetchData };
};
