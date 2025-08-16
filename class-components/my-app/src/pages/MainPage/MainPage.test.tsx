import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { pokemonApi, useGetPokemonListQuery } from '../../api/pokemonApi';

const mockDispatch = jest.fn();
jest.mock('../../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('../../components/search/Search', () => {
  const MockSearch = () => <div data-testid="mock-search">Search</div>;
  MockSearch.displayName = 'MockSearch';
  return MockSearch;
});

jest.mock('../../components/cardList/CardList', () => {
  const MockCardList = () => <div data-testid="mock-cardlist">CardList</div>;
  MockCardList.displayName = 'MockCardList';
  return MockCardList;
});

jest.mock('../../components/pagination/Pagination', () => {
  const MockPagination = () => <div data-testid="mock-pagination">Pagination</div>;
  MockPagination.displayName = 'MockPagination';
  return MockPagination;
});

jest.mock('../../api/pokemonApi', () => {
  const actual = jest.requireActual('../../api/pokemonApi');
  return {
    ...actual,
    useGetPokemonListQuery: jest.fn(),
  };
});

describe('MainPage', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
    (useGetPokemonListQuery as jest.Mock).mockReset();
  });

  it('renders loading state', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
    });

    render(<MainPage />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('mock-search')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch data'),
    });

    render(<MainPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
  });

  it('renders data state with CardList and Pagination', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: { results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }] },
      isLoading: false,
      isError: false,
      error: undefined,
    });

    render(<MainPage />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('mock-cardlist')).toBeInTheDocument();
    expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
  });

  it('dispatches invalidateTags on refresh click', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isError: false,
      error: undefined,
    });

    render(<MainPage />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));

    expect(mockDispatch).toHaveBeenCalledWith(
      pokemonApi.util.invalidateTags([{ type: 'PokemonList', id: 'LIST' }])
    );
  });
});
