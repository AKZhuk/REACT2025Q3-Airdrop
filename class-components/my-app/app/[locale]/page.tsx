import React from 'react';
import type { PokemonItem } from '@/types';
import MainPage from '@/pages/MainPage/MainPage';

export const revalidate = 60;

export default async function AboutPage() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');

  if (!res.ok) {
    return <MainPage initialPokemons={[]} />;
  }

  const data = await res.json();
  const initialPokemons = (data.results ?? []) as PokemonItem[];

  return <MainPage initialPokemons={initialPokemons} />;
}