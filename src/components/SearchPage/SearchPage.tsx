import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import ErrorButton from '../common/ErrorButton';
import Pagination from '../Pagination/Pagintaion';
import { useFetchData } from '../../hooks/useFetchData';
import ThemeSwitcher from '../common/ThemeSwitcher';
import { useTheme } from '../contexts/ThemeContext';
import Flyout from '../common/Flyout';
import Spinner from '../common/Spinner';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = Number.parseInt(searchParams.get('page') || '1', 10);
  const { id: detailsId } = useParams<{ id: string }>();
  const { theme } = useTheme();

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [shouldThrow, setShouldThrow] = useState(false);
  const { results, errorMessage, isLoading, totalItems, fetchData } =
    useFetchData();

  useEffect(() => {
    fetchData(searchValue, currentPage);
  }, [fetchData, currentPage]);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    fetchData(searchValue, 1);
    navigate('?page=1', { replace: true });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (shouldThrow) {
    throw new Error('Test ErrorBoundary');
  }

  return (
    <div className={`container ${theme}`}>
      <ThemeSwitcher />
      <div className="header-container">
        <Header
          searchValue={searchValue}
          onSearchChange={(e) => setSearchValue(e.target.value)}
          onSearchSubmit={handleSearchButtonClick}
        />
        <ErrorButton onClick={() => setShouldThrow(true)} />
      </div>
      <div className="results">
        {isLoading ? (
          <div className="loading-container">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <CardList results={results} />
        )}
        {detailsId && <Outlet />}
      </div>
      {!isLoading && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={10}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}

      <Flyout />
    </div>
  );
};

export default SearchPage;
