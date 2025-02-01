import { Component } from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

export default class SearchButton extends Component<SearchButtonProps> {
  render() {
    return <button onClick={this.props.onClick}> Search</button>;
  }
}
