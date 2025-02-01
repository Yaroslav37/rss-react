import { Component } from 'react';

interface ErrorButtonProps {
  onClick: () => void;
}
export default class ErrorButton extends Component<ErrorButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>ErrorButton</button>;
  }
}
