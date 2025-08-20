import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import type { PokemonItem } from '../../types';

describe('Card component', () => {
  const basePokemon: PokemonItem = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  it('renders without crashing', () => {
    render(<Card pokemon={basePokemon} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('displays the correct name', () => {
    render(<Card pokemon={basePokemon} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('sets correct image src from pokemon ID', () => {
    render(<Card pokemon={basePokemon} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
  });

  it('sets alt text as pokemon name', () => {
    render(<Card pokemon={basePokemon} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'pikachu');
  });

  it('handles unknown ID when url does not match pattern', () => {
    const pokemonWithoutId: PokemonItem = {
      name: 'unknownmon',
      url: 'https://pokeapi.co/api/v2/pokemon/',
    };
    render(<Card pokemon={pokemonWithoutId} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/unknown.png'
    );
  });
});
