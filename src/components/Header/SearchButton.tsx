import { Component } from 'react';
import { SearchButtonProps } from '../../types/types';

export default class SearchButton extends Component<SearchButtonProps> {
  render() {
    return <button onClick={this.props.onClick}> Search</button>;
  }
}
