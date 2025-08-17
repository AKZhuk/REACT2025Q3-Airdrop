'use client';

import React from 'react';
import Image from 'next/image';
import type { PokemonItem } from '../../types';
import './Card.css';

interface Props {
  pokemon: PokemonItem;
  onClick?: (name: string) => void;
}

const Card: React.FC<Props> = ({ pokemon, onClick }) => {
  const { name, url } = pokemon;
  const idMatch = url.match(/\/pokemon\/(\d+)\//);
  const id = idMatch ? idMatch[1] : 'unknown';
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const handleClick = () => {
    if (onClick) onClick(name);
  };

  return (
    <div className={`card`} onClick={handleClick} role="button" tabIndex={0}>
      <Image
        className="card__img"
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
        priority={false}
      />
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
