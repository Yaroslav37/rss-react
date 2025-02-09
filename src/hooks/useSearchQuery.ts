import { useState, useEffect } from 'react';

export const useSearchQuery = (initialQuery = '') => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    try {
      const storedQuery = localStorage.getItem('searchQuery');
      return storedQuery ? JSON.parse(storedQuery) : initialQuery;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialQuery;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};
