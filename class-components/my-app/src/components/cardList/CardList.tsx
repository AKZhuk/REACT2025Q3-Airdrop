import React from 'react';
import type { PokemonItem } from '../../types';
import Card from '../card/Card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './CardList.css';

interface Props {
  pokemons: PokemonItem[];
}

const CardList: React.FC<Props> = ({ pokemons }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCardClick = (name: string) => {
    searchParams.set('details', name);
    navigate(`/?${searchParams.toString()}`, { replace: false });
  };

  if (pokemons.length === 0) {
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