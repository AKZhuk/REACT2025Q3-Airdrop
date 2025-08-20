import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders title, author and link', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: /pokemon seacrh/i })).toBeInTheDocument();

    expect(screen.getByText(/author: artsiom luksha/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /rs school react course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});