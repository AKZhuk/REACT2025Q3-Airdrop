import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Main from './Main';
import type { PokemonItem } from '../../types';

jest.mock('../../api/api', () => ({
  __esModule: true,
  fetchPokemonList: jest.fn(),
}));
import { fetchPokemonList } from '../../api/api';

jest.mock('../search/Search', () => {
  type Props = { onSearch: (term: string) => void };

  function MockSearch({ onSearch }: Props) {
    return (
      <div>
        <input
          data-testid="search-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearch(e.target.value)
          }
        />
      </div>
    );
  }
  MockSearch.displayName = 'MockSearch';

  return { __esModule: true, default: MockSearch };
});

jest.mock('../cardList/CardList', () => {
  type Props = { pokemons: PokemonItem[] };

  function MockCardList({ pokemons }: Props) {
    return (
      <div data-testid="card-list">
        {pokemons.map((p) => (
          <div key={p.name}>{p.name}</div>
        ))}
      </div>
    );
  }
  MockCardList.displayName = 'MockCardList';

  return { __esModule: true, default: MockCardList };
});

describe('Main component', () => {
  const mockPokemons = {
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Search and Break button', () => {
    render(<Main />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /break the application/i })
    ).toBeInTheDocument();
  });

  it('loads pokemons on mount (success)', async () => {
    (fetchPokemonList as jest.Mock).mockResolvedValueOnce(mockPokemons);

    render(<Main />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId('card-list')).toBeInTheDocument()
    );
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('shows error message on API failure', async () => {
    (fetchPokemonList as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    render(<Main />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument()
    );
  });

  it('calls handleSearch when input changes', async () => {
    (fetchPokemonList as jest.Mock).mockResolvedValueOnce(mockPokemons);
    render(<Main />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'charizard' } });

    await waitFor(() => {
      expect(fetchPokemonList).toHaveBeenCalledWith('charizard', 20, 0);
    });
  });

  it('throws error when Break button clicked', () => {
    render(<Main />);
    const breakButton = screen.getByRole('button', {
      name: /break the application/i,
    });
    expect(() => fireEvent.click(breakButton)).toThrow('Test error');
  });
});
