import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

const LS_KEY = 'pokemon_search_term';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/enter pokemon name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('loads saved search term from localStorage on mount', () => {
    localStorage.setItem(LS_KEY, 'bulbasaur');
    render(<Search />);
    expect(screen.getByDisplayValue('bulbasaur')).toBeInTheDocument();
  });

  it('calls onSearch with saved term on mount if available', () => {
    const mockOnSearch = jest.fn();
    localStorage.setItem(LS_KEY, 'pikachu');
    render(<Search onSearch={mockOnSearch} />);
    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  });

  it('updates input value on change', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/enter pokemon name/i);
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect((input as HTMLInputElement).value).toBe('charizard');
  });

  it('trims input, saves to localStorage, and calls onSearch on button click', () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter pokemon name/i);
    const button = screen.getByRole('button', { name: /search/i });


    fireEvent.change(input, { target: { value: '   mewtwo   ' } });
    fireEvent.click(button);

    expect(localStorage.getItem(LS_KEY)).toBe('mewtwo');
    expect(mockOnSearch).toHaveBeenCalledWith('mewtwo');
  });

  it('does not crash if onSearch is undefined', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/enter pokemon name/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'ditto' } });
    fireEvent.click(button);

    expect(localStorage.getItem(LS_KEY)).toBe('ditto');
  });
});
