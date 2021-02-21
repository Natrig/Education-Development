import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorIndicator } from './ErrorIndicator';

type ErrorBoundaryState = {
  error: Error | null;
}

export default class ErrorBoundary extends Component {
  state: ErrorBoundaryState = {
    error: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error });
  }

  public render(): ReactNode {
    const { error } = this.state;

    if (error) {
      return <ErrorIndicator error={error.message}/>;
    }

    return this.props.children;
  }
}
