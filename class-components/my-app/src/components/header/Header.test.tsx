import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import * as ThemeContext from '../../context/ThemeContext';

describe('Header component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

  it('renders the title and navigation links', () => {
    renderWithRouter();

    expect(
      screen.getByRole('heading', { name: /pokemon search/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('renders the theme toggle button and calls toggleTheme on click', () => {
    renderWithRouter();

    const themeButton = screen.getByRole('button', { name: /light/i });
    expect(themeButton).toBeInTheDocument();

    fireEvent.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
