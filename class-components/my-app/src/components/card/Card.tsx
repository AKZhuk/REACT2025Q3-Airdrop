'use client';

import React from 'react';
import Image from 'next/image';
import type { PokemonItem } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleItem } from '@/store/selectedItemsSlice';
import './Card.css';

interface Props {
  pokemon: PokemonItem;
  onClick?: (name: string) => void;
}

const Card: React.FC<Props> = ({ pokemon, onClick }) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((s) => s.selectedItems.items);
  const isSelected = selectedItems.some((i) => i.name === pokemon.name);

  const { name, url } = pokemon;
  const idMatch = url.match(/\/pokemon\/(\d+)\//);
  const id = idMatch ? idMatch[1] : 'unknown';
  const imgSrc =
    id !== 'unknown'
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      : '';

  const handleCardClick = () => onClick?.(name);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleItem(pokemon));
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className={`card ${isSelected ? 'card--selected' : ''}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-pressed={isSelected}
      aria-label={`Open details for ${name}`}
    >
      <input
        type="checkbox"
        className="card__checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Select ${name}`}
      />

      {imgSrc && (
        <Image
          src={imgSrc}
          alt={name}
          width={100}
          height={100}
          priority={false}
        />
      )}

      <h3>{name}</h3>
    </div>
  );
};

export default Card;
