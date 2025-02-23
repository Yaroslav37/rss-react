import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../types/types';

interface SelectedItemsState {
  items: Card[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Card>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
