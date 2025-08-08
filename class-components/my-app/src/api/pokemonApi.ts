import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonApiResponse } from '../types';
import type { PokemonDetails } from '../types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['PokemonList'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonApiResponse, { searchTerm: string; page: number }>({
      query: ({ searchTerm, page }) => {
        const limit = 10;
        const offset = (page - 1) * limit;
        const trimmedSearchTerm = searchTerm.trim().toLowerCase();
        return `pokemon?limit=${limit}&offset=${offset}&search=${encodeURIComponent(trimmedSearchTerm)}`;
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
      providesTags: () => [{ type: 'PokemonList', id: 'LIST' }],
    }),

    getPokemonByName: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useLazyGetPokemonByNameQuery,
} = pokemonApi;
