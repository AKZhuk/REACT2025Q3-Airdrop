import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 not found message', () => {
    render(<NotFoundPage />);
    const heading = screen.getByText(/404 - Page Not Found/i);
    expect(heading).toBeInTheDocument();
  });
});
