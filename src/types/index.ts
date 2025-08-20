export interface PokemonItem {
  name: string;
  url: string;
  id?: string;
}

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
}
