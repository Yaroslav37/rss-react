import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './store/selectedItemSlice';
import { swApi } from './services/starwars';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swApi.middleware),
});
