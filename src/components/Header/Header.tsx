import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

export default class Header extends Component<HeaderProps> {
  render() {
    return (
      <div>
        <SearchInput
          value={this.props.searchValue}
          onChange={this.props.onSearchChange}
        />
        <SearchButton onClick={this.props.onSearchSubmit} />
      </div>
    );
  }
}
