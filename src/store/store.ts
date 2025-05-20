import { configureStore } from '@reduxjs/toolkit';
import driversSlice from './slices/driverSlice';

export const store = configureStore({
  reducer: { driversSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
