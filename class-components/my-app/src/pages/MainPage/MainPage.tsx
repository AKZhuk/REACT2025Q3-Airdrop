import React from 'react';
import CardList from '../../components/cardList/CardList';
import Search from '../../components/search/Search';
import Pagination from '../../components/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useGetPokemonListQuery } from '../../api/pokemonApi';
import './MainPage.css';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPokemonListQuery({ searchTerm, page });

  const handleSearch = (term: string) => {
    setSearchParams({ q: term, page: '1' });
  };

  return (
    <div className="main-page">
      <Search onSearch={handleSearch} />

      <button onClick={refetch} className="main__refresh-button">
        🔄 Refresh
      </button>

      {isLoading && <p className="main-loading">Loading...</p>}
      {isError && (
        <p className="main-error">
          {error instanceof Error ? error.message : 'Failed to fetch Pokemons'}
        </p>
      )}
      {!isLoading && !isError && data && (
        <>
          <CardList pokemons={data.results} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default MainPage;