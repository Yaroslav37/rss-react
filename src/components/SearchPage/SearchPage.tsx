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
}

export default class SearchPage extends Component {
  state: SearchPageState = {
    searchValue: this.getSearchValue(),
    results: [],
  };

  getSearchValue(): string {
    return localStorage.getItem('searchValue') || '';
  }

  componentDidMount(): void {
    // const searchValue = this.getSearchValue();
    // if (searchValue) {
    //   this.setState({ searchValue });
    // }
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

      if (!response.ok) {
        throw new Error('Error');
      }

      const data = await response.json();
      this.setState({ results: data.results });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    return (
      <div>
        <Header
          searchValue={this.state.searchValue}
          onSearchChange={this.handleSearchChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <CardList results={this.state.results} />
        <ErrorButton />
      </div>
    );
  }
}
