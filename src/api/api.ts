import type { PokemonApiResponse } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonList(
  searchTerm: string,
  limit = 10,
  offset = 0
): Promise<PokemonApiResponse> {
  const trimmedTerm = searchTerm.trim().toLowerCase();
  const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: PokemonApiResponse = await response.json();

  if (!Array.isArray(data.results)) {
    throw new Error('Invalid API response: missing results array');
  }

  if (!trimmedTerm) {
    return data;
  }

  const filtered = data.results.filter((item) =>
    item.name.toLowerCase().includes(trimmedTerm)
  );

  return {
    ...data,
    results: filtered,
  };
}
