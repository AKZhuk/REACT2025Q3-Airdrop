'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useLazyGetPokemonByNameQuery, pokemonApi } from '@/api/pokemonApi';
import { useAppDispatch } from '@/store/hooks';
import './PokemonDetail.css';

const PokemonDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const detailsId = searchParams.get('details');

  const [fetchByName, { data: pokemon, isLoading, isError }] =
    useLazyGetPokemonByNameQuery();

  useEffect(() => {
    if (detailsId) {
      fetchByName(detailsId);
    }
  }, [detailsId, fetchByName]);

  if (!detailsId) return null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`);
  };

  const handleRefresh = async () => {
    if (!detailsId) return;
    await dispatch(
      pokemonApi.util.invalidateTags([{ type: 'PokemonDetails', id: detailsId }])
    );
    fetchByName(detailsId, false);
  };

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail__toolbar">
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
          {pokemon.sprites?.front_default && (
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
