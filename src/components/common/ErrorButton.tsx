import { Component } from 'react';
import './ErrorButton.css';
import { ErrorButtonProps } from '../../types/types';

export default class ErrorButton extends Component<ErrorButtonProps> {
  render() {
    return (
      <button className="error-button" onClick={this.props.onClick}>
        ErrorButton
      </button>
    );
  }
}
