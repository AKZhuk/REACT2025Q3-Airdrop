'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLazyGetPokemonByNameQuery } from '@/api/pokemonApi';
import Image from 'next/image';
import './PokemonDetail.css';

const PokemonDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const detailsId = searchParams.get('details');

  const [fetchByName, { data: pokemon, isLoading, isError }] =
    useLazyGetPokemonByNameQuery();

  useEffect(() => {
    if (detailsId) fetchByName(detailsId);
  }, [detailsId, fetchByName]);

  if (!detailsId) return null;

  return (
    <div className="pokemon-detail">

      {isLoading && <p>Loading details...</p>}
      {isError && <p>Pokemon not found</p>}
      {pokemon && (
        <div className="pokemon-detail__info">
          <h2>{pokemon.name}</h2>
          {pokemon.sprites.front_default && (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={120}
              height={120}
            />
          )}
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
