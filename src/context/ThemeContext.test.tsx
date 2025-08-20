import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('initializes with theme from localStorage or default', () => {
    localStorage.setItem('app_theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggles theme from light to dark and updates localStorage', async () => {
    localStorage.setItem('app_theme', 'light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    await userEvent.click(screen.getByText(/toggle/i));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('app_theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('throws error if useTheme is used outside of ThemeProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const BrokenComponent = () => {
      useTheme();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrowError(
      'useTheme must be used within a ThemeProvider'
    );

    consoleError.mockRestore();
  });
});
