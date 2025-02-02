import { Component } from 'react';
import './Header.css';
import { SearchInputProps } from '../../types/types';

export default class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <input
        className="search-input"
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder="Search..."
      />
    );
  }
}
