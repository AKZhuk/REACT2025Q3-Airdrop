'use client';

import React from 'react';
import type { PokemonItem } from '../../types';
import Card from '../card/Card';
import { useRouter, useSearchParams } from 'next/navigation';
import './CardList.css';

interface Props { pokemons: PokemonItem[]; }

const CardList: React.FC<Props> = ({ pokemons }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCardClick = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', name);
    router.push(`/?${params.toString()}`);
  };

  if (pokemons.length === 0) {
    return <p className="empty">Nothing was found</p>;
  }

  return (
    <div className="card-list" aria-label="card-list">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
          onClick={() => handleCardClick(pokemon.name)}
        />
      ))}
    </div>
  );
};

export default CardList;