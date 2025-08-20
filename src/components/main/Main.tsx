import React, { useEffect, useState, useCallback } from 'react';
import { fetchPokemonList } from '../../api/api';
import type { PokemonItem } from '../../types';

import Search from '../search/Search';
import CardList from '../cardList/CardList';
import './Main.css';

const Main: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPokemons = useCallback(async (searchTerm: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList(searchTerm, 20, 0);
      setPokemons(data.results);
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPokemons('');
  }, [loadPokemons]);

  const handleSearch = (searchTerm: string): void => {
    loadPokemons(searchTerm);
  };

  const throwError = (): void => {
    throw new Error('Test error');
  };

  return (
    <main className="main">
      <Search onSearch={handleSearch} />
      <button className="main__break-button" onClick={throwError}>
        Break the application
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="main__error">{error}</p>}
      {!loading && !error && <CardList pokemons={pokemons} />}
    </main>
  );
};

export default Main;
