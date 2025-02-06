import React, { useCallback, useEffect, useState } from 'react';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import { Card } from '../../types/types';
import ErrorButton from '../common/ErrorButton';
import './SearchPage.css';
import spinner from '../../assets/spinner.svg';
import Pagination from '../Pagination/Pagintaion';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState(() => getSearchValue());
  const [results, setResults] = useState<Card[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.results);
      setTotalItems(data.count);
      setErrorMessage(null);
    } catch (error) {
      setResults([]);
      setErrorMessage(
        `Ошибка при получении данных: ${(error as Error).message}`
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const LsSearchValue = getSearchValue();
    setSearchValue(LsSearchValue);
    fetchData(LsSearchValue, 1);
  }, [fetchData]);

  function getSearchValue(): string {
    return localStorage.getItem('searchValue') || '';
  }

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    localStorage.setItem('searchValue', searchValue);
    fetchData(searchValue, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(searchValue, page);
  };

  if (shouldThrow) {
    throw new Error('Test ErrorBoundary');
  }

  return (
    <div className="container">
      <Header
        searchValue={searchValue}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        onSearchSubmit={handleSearchButtonClick}
      />
      <div className="results">
        {isLoading ? (
          <img src={spinner} alt="Loading..." />
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <CardList results={results} />
        )}
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <ErrorButton onClick={() => setShouldThrow(true)} />
    </div>
  );
};

export default SearchPage;
