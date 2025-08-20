import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PokemonItem } from '../types';

interface SelectedItemsState {
  items: PokemonItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<PokemonItem>) {
      const exists = state.items.find(item => item.name === action.payload.name);
      if (exists) {
        state.items = state.items.filter(item => item.name !== action.payload.name);
      } else {
        state.items.push(action.payload);
      }
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { toggleItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
