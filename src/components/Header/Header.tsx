import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

export default class Header extends Component {
  state = { searchValue: '' };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    return (
      <div>
        <SearchInput
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />
        <SearchButton />
      </div>
    );
  }
}
