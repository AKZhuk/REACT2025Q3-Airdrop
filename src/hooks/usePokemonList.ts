import { useGetPokemonListQuery } from '../api/pokemonApi';

export function usePokemonList(searchTerm: string, page: number) {
  const {
    data,
    isLoading: loading,
    isError,
  } = useGetPokemonListQuery({ searchTerm, page });

  return {
    pokemons: data?.results ?? [],
    loading,
    error: isError ? 'Failed to fetch Pokemons' : null,
  };
}
