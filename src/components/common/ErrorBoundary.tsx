import React, { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/types';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Ooops...</h1>
          <p>Reload page</p>
        </div>
      );
    }
    return this.props.children;
  }
}
