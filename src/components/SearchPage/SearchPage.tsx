import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import type { Card } from '../../types/types';
import ErrorButton from '../common/ErrorButton';
import './SearchPage.css';
import spinner from '../../assets/spinner.svg';
import Pagination from '../Pagination/Pagintaion';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = Number.parseInt(searchParams.get('page') || '1', 10);
  const { setItem, getItem } = useLocalStorage('searchValue');

  const [searchValue, setSearchValue] = useState(() => getItem());
  const [results, setResults] = useState<Card[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
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
      const resultsWithId = data.results.map((item: Card, index: number) => ({
        ...item,
        id: index + 1,
      }));
      setResults(resultsWithId);
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
    const LsSearchValue = getItem();
    setSearchValue(LsSearchValue);
    fetchData(LsSearchValue, currentPage);
  }, [fetchData, currentPage]);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    setItem(searchValue);
    fetchData(searchValue, 1);
    navigate('?page=1', { replace: true });
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Header
          searchValue={searchValue}
          onSearchChange={(e) => setSearchValue(e.target.value)}
          onSearchSubmit={handleSearchButtonClick}
        />
        <ErrorButton onClick={() => setShouldThrow(true)} />
      </div>
      <div className="results">
        {isLoading ? (
          <img src={spinner || '/placeholder.svg'} alt="Loading..." />
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <CardList results={results} />
        )}
        <Outlet />
      </div>
      {!isLoading && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchPage;
