import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const Bomb = () => {
  throw new Error('Boom!');
};

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('displays fallback UI when child throws error', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something was wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('calls componentDidCatch and logs warning', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(console.warn).toHaveBeenCalled();
    const [message] = (console.warn as jest.Mock).mock.calls[0];
    expect(message).toContain('Caught by ErrorBoundary');
  });

  it('resets error state when Try again button is clicked', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something was wrong/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    render(
      <ErrorBoundary>
        <div>Safe after reset</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe after reset')).toBeInTheDocument();
  });
});
