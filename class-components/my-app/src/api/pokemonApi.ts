import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonApiResponse } from '../types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonApiResponse, { searchTerm: string; page: number }>({
      query: ({ searchTerm, page }) => {
        const limit = 10;
        const offset = (page - 1) * limit;
        return `pokemon?limit=${limit}&offset=${offset}`;
      },
      transformResponse: (response: PokemonApiResponse, _, { searchTerm }) => {
        if (!searchTerm.trim()) return response;
        return {
          ...response,
          results: response.results.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
          ),
        };
      },
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonApi;
