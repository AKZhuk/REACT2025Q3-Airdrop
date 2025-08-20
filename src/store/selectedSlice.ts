import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  name: string;
  description?: string;
  url: string;
}

interface State {
  selected: Record<string, SelectedItem>;
}

const initialState: State = {
  selected: {},
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelect(state, action: PayloadAction<SelectedItem>) {
      const item = action.payload;
      if (state.selected[item.name]) {
        delete state.selected[item.name];
      } else {
        state.selected[item.name] = item;
      }
    },
    unselectAll(state) {
      state.selected = {};
    },
  },
});

export const { toggleSelect, unselectAll } = selectedSlice.actions;
export default selectedSlice.reducer;