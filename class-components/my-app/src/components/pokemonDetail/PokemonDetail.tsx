import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../../api/pokemonApi';
import './PokemonDetail.css';

const PokemonDetail: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const { data: pokemon, isLoading, isError } = useGetPokemonByNameQuery(detailsId!, {
    skip: !detailsId,
  });

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  if (!detailsId) return null;

  return (
    <div className="pokemon-detail">
      <button className="pokemon-detail__close-button" onClick={handleClose}>
        Close
      </button>
      {isLoading && <p>Loading details...</p>}
      {isError && <p>Pokemon not found</p>}
      {pokemon && (
        <div className="pokemon-detail__info">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
