import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import ErrorButton from '../common/ErrorButton';
import Pagination from '../Pagination/Pagintaion';
import ThemeSwitcher from '../common/ThemeSwitcher';
import { useTheme } from '../contexts/ThemeContext';
import Flyout from '../common/Flyout';
import Spinner from '../common/Spinner';
import { useGetHeroesQuery } from '../../services/starwars';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { unselectAll } from '../../store/selectedItemSlice';
import { useDispatch } from 'react-redux';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = Number.parseInt(searchParams.get('page') || '1', 10);
  const { id: detailsId } = useParams<{ id: string }>();
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [shouldThrow, setShouldThrow] = useState(false);
  const dispatch = useDispatch();

  const { data, error, isFetching } = useGetHeroesQuery({
    searchQuery: searchQuery,
    page: currentPage,
  });

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage]);

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    setSearchQuery(searchValue);
    navigate('?page=1', { replace: true });
    dispatch(unselectAll());
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
        {isFetching ? (
          <div className="loading-container">
            <Spinner />
          </div>
        ) : error ? (
          <div>error fetching data</div>
        ) : (
          <CardList results={data?.results || []} />
        )}
        {detailsId && <Outlet />}
      </div>
      {!isFetching && (
        <Pagination
          totalItems={data?.count || 0}
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
