import React from 'react';
import CardList from '../../components/cardList/CardList';
import Search from '../../components/search/Search';
import Pagination from '../../components/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { usePokemonList } from '../../hooks/usePokemonList';
import { useGetPokemonListQuery } from '../../api/pokemonApi';
import './MainPage.css';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { pokemons, loading, error } = usePokemonList(searchTerm, page);
  const { refetch } = useGetPokemonListQuery({ searchTerm, page });

  const handleSearch = (term: string) => {
    setSearchParams({ q: term, page: '1' });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="main-page">
      <Search onSearch={handleSearch} />

      <button onClick={handleRefresh} className="main__refresh-button">
        🔄 Refresh
      </button>

      {loading && <p className="main-loading">Loading...</p>}
      {error && <p className="main-error">{error}</p>}
      {!loading && !error && (
        <>
          <CardList pokemons={pokemons} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default MainPage;