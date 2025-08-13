import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyGetPokemonByNameQuery, pokemonApi } from '../../api/pokemonApi';
import { useDispatch } from 'react-redux';
import './PokemonDetail.css';

const PokemonDetail: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const dispatch = useDispatch();

  const [
    fetchPokemonByName,
    { data: pokemon, isLoading, isError },
  ] = useLazyGetPokemonByNameQuery();

  useEffect(() => {
    if (detailsId) {
      fetchPokemonByName(detailsId);
    }
  }, [detailsId, fetchPokemonByName]);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  const handleRefresh = async () => {
    if (detailsId) {
      await dispatch(
        pokemonApi.util.invalidateTags([{ type: 'PokemonDetails', id: detailsId }])
      );
      fetchPokemonByName(detailsId, true);
    }
  };

  if (!detailsId) return null;

  return (
    <div className="pokemon-detail">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="pokemon-detail__close-button" onClick={handleClose}>
          Close
        </button>
        <button className="pokemon-detail__refresh-button" onClick={handleRefresh}>
          🔄 Refresh
        </button>
      </div>

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
