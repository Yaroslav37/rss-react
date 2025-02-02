import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import './Header.css';
import { HeaderProps } from '../../types/types';

export default class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className="header">
        <SearchInput
          value={this.props.searchValue}
          onChange={this.props.onSearchChange}
        />
        <SearchButton onClick={this.props.onSearchSubmit} />
      </div>
    );
  }
}
