import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonDetail from './PokemonDetail';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { useLazyGetPokemonByNameQuery } from '../../api/pokemonApi';
import type { PokemonDetails } from '../../types/types';

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useSearchParams: jest.fn(),
  };
});

jest.mock('../../api/pokemonApi', () => ({
  useLazyGetPokemonByNameQuery: jest.fn(),
}));

describe('PokemonDetail component (RTK Query)', () => {
  const mockSetSearchParams = jest.fn();
  const triggerMock = jest.fn();

  const mockUseQueryState: {
    data: PokemonDetails | null;
    isLoading: boolean;
    isError: boolean;
  } = {
    data: null,
    isLoading: false,
    isError: false,
  };

  const setup = (detailsId: string | null) => {
    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockReturnValue([
      new URLSearchParams(detailsId ? `details=${detailsId}` : ''),
      mockSetSearchParams,
    ]);

    (useLazyGetPokemonByNameQuery as jest.Mock).mockReturnValue([
      triggerMock,
      mockUseQueryState,
    ]);

    render(
      <MemoryRouter>
        <PokemonDetail />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQueryState.data = null;
    mockUseQueryState.isLoading = false;
    mockUseQueryState.isError = false;
  });

  it('does not render when "details" param is missing', () => {
    setup(null);
    expect(triggerMock).not.toHaveBeenCalled();
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  it('calls trigger and shows loading state', () => {
    mockUseQueryState.isLoading = true;
    setup('pikachu');

    expect(triggerMock).toHaveBeenCalledWith('pikachu');
    expect(screen.getByText(/Loading details/i)).toBeInTheDocument();
  });

  it('shows error state when query fails', () => {
    mockUseQueryState.isError = true;
    setup('missingno');

    expect(screen.getByText(/Pokemon not found/i)).toBeInTheDocument();
  });

  it('shows data when query succeeds', () => {
    mockUseQueryState.data = {
      name: 'bulbasaur',
      sprites: { front_default: 'bulba.png' },
      height: 7,
      weight: 69,
    };

    setup('bulbasaur');

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 7/)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 69/)).toBeInTheDocument();
  });

  it('clicking "Close" removes details param', () => {
    mockUseQueryState.data = {
      name: 'bulbasaur',
      sprites: { front_default: 'bulba.png' },
      height: 7,
      weight: 69,
    };

    setup('bulbasaur');

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
