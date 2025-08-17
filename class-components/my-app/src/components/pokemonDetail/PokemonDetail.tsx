'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLazyGetPokemonByNameQuery } from '../../api/pokemonApi';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '../../api/pokemonApi';
import './PokemonDetail.css';

const PokemonDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const detailsId = searchParams.get('details');

  const dispatch = useDispatch();
  const [fetchPokemon, { data: pokemon, isLoading, isError }] =
    useLazyGetPokemonByNameQuery();

  useEffect(() => {
    if (detailsId) fetchPokemon(detailsId);
  }, [detailsId, fetchPokemon]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`);
  };

  const handleRefresh = async () => {
    if (detailsId) {
      await dispatch(
        pokemonApi.util.invalidateTags([{ type: 'PokemonDetails', id: detailsId }])
      );
      fetchPokemon(detailsId, true);
    }
  };

  if (!detailsId) return null;

  return (
    <div className="pokemon-detail">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="pokemon-detail__close-button" onClick={handleClose}>Close</button>
        <button className="pokemon-detail__refresh-button" onClick={handleRefresh}>🔄 Refresh</button>
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