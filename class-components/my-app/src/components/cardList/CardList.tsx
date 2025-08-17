'use client';

import React from 'react';
import type { PokemonItem } from '../../types';
import Card from '../card/Card';
import { useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';
import './CardList.css';

export interface CardListProps {
  pokemons: PokemonItem[];
}

const CardList: React.FC<CardListProps> = ({ pokemons }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCardClick = (name: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('details', name);
    router.push(`/?${params.toString()}`);
  };

  if (!pokemons || pokemons.length === 0) {
    return <p className="empty">Nothing was found</p>;
  }

  return (
    <div className="card-list" role="region" aria-label="card-list">
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
