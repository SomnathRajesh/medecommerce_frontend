import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productList/productSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
