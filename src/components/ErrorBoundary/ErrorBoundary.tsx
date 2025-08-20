import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn('Caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something was wrong</h1>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
