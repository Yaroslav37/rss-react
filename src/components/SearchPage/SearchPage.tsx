import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import ErrorButton from '../common/ErrorButton';
import './SearchPage.css';
import spinner from '../../assets/spinner.svg';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState(() => getSearchValue());
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    //useMemo
    handleSearchSubmit();
  }, []);

  function getSearchValue(): string {
    return localStorage.getItem('searchValue') || '';
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async () => {
    setIsLoading(true);
    try {
      setSearchValue(searchValue.trim());
      localStorage.setItem('searchValue', searchValue);

      const url = searchValue
        ? `https://swapi.dev/api/people/?search=${searchValue}`
        : `https://swapi.dev/api/people/`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.results);
      setIsLoading(false);
      setErrorMessage(null); //mb ubrat
    } catch (error) {
      setResults([]);
      setErrorMessage(
        `Ошибка при получении данных: ${(error as Error).message}`
      );
    } finally {
      setIsLoading(false);
    }
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
      <ErrorButton onClick={() => setShouldThrow(true)} />
    </div>
  );
};

export default SearchPage;
