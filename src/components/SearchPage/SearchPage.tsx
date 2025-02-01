import { Component } from 'react';
import Header from '../Header/Header';
import CardList from '../Main/CardList';
import ErrorButton from '../common/ErrorButton';

interface Card {
  name: string;
  gender: string;
  height: string;
  mass: string;
}

interface SearchPageState {
  searchValue: string;
  results: Card[];
  errorMessage: string | null;
}

export default class SearchPage extends Component {
  state: SearchPageState = {
    searchValue: this.getSearchValue(),
    results: [],
    errorMessage: null,
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
    try {
      const searchValue = this.state.searchValue.trim();
      localStorage.setItem('searchValue', searchValue);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchValue}`
      );

      if (response.ok) {
        throw new Error('Error');
      }

      const data = await response.json();
      this.setState({ results: data.results, errorMessage: null });
    } catch (error) {
      this.setState({ errorMessage: 'Error fetching data' });
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
      <div style={{ height: '600px', width: '600px' }}>
        <Header
          searchValue={this.state.searchValue}
          onSearchChange={this.handleSearchChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <div>
          {this.state.errorMessage ? (
            <div>{this.state.errorMessage}</div>
          ) : (
            <CardList results={this.state.results} />
          )}
        </div>
        <ErrorButton onClick={this.handleThrowError} />
      </div>
    );
  }
}
