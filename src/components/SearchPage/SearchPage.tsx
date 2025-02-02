import { Component } from 'react';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import ErrorButton from '../common/ErrorButton';
import './SearchPage.css';
import spinner from '../../assets/spinner.svg';
import { SearchPageState } from '../../types/types';

export default class SearchPage extends Component {
  state: SearchPageState = {
    searchValue: this.getSearchValue(),
    results: [],
    errorMessage: null,
    isLoading: false,
  };

  getSearchValue(): string {
    return localStorage.getItem('searchValue') || '';
  }

  componentDidMount(): void {
    this.handleSearchSubmit();
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    this.setState({ searchValue: searchValue });
  };

  handleSearchSubmit = async () => {
    this.setState({ isLoading: true });
    try {
      const searchValue = this.state.searchValue.trim();
      localStorage.setItem('searchValue', searchValue);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchValue}`
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.setState({
        results: data.results,
        errorMessage: null,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        results: `Ошибка при получении данных: ${(error as Error).message}`,
        errorMessage: null,
        isLoading: false,
      });
      console.error('Error fetching data:', error);
    }
  };

  handleThrowError = () => {
    this.setState(() => {
      throw new Error('Test ErrorBoundary');
    });
  };

  render() {
    return (
      <div className="container">
        <Header
          searchValue={this.state.searchValue}
          onSearchChange={this.handleSearchChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <div className="results">
          {this.state.isLoading ? (
            <img src={spinner} />
          ) : typeof this.state.results === 'string' ? (
            <div>{this.state.results}</div>
          ) : (
            <CardList results={this.state.results} />
          )}
        </div>
        <ErrorButton onClick={this.handleThrowError} />
      </div>
    );
  }
}
