'use client';

import React from 'react';
import type { PokemonItem } from '../../types';
import Card from '../card/Card';
import { useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import './CardList.css';

interface Props { pokemons: PokemonItem[]; }

const CardList: React.FC<Props> = ({ pokemons }) => {
  const t = useTranslations('CardList');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCardClick = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', name);
    router.push(`/?${params.toString()}`);
  };

  if (pokemons.length === 0) {
    return <p className="empty">{t('empty')}</p>;
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
