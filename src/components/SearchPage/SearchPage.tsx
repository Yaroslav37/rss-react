import { useEffect, useState, useCallback } from 'react';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import { Card } from '../../types/types';
import ErrorButton from '../common/ErrorButton';
import './SearchPage.css';
import spinner from '../../assets/spinner.svg';
import Pagintaion from '../Pagination/Pagintaion';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState(() => getSearchValue());
  const [results, setResults] = useState<Card[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const handleSearchSubmit = useCallback(async () => {
    console.log(currentPage);
    setIsLoading(true);
    try {
      const trimmedSearchValue = searchValue.trim();
      setSearchValue(trimmedSearchValue);
      localStorage.setItem('searchValue', trimmedSearchValue);

      const url = trimmedSearchValue
        ? `https://swapi.dev/api/people/?search=${trimmedSearchValue}&page=${currentPage}`
        : `https://swapi.dev/api/people/?page=${currentPage}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.results);
      console.log(results);
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
  }, [currentPage]);

  useEffect(() => {
    handleSearchSubmit();
  }, [handleSearchSubmit]);

  function getSearchValue(): string {
    return localStorage.getItem('searchValue') || '';
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (shouldThrow) {
    throw new Error('Test ErrorBoundary');
  }

  return (
    <div className="container">
      <Header
        searchValue={searchValue}
        onSearchChange={(e) => handleSearchChange(e)}
        onSearchSubmit={() => handleSearchSubmit()}
      />
      <div className="results">
        {isLoading ? (
          <img src={spinner} />
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <CardList results={results} />
        )}
      </div>
      <Pagintaion
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ErrorButton onClick={() => setShouldThrow(true)} />
    </div>
  );
};

export default SearchPage;
