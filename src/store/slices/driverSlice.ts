import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Driver } from '../types/DriverType';

interface InitialState {
  drivers: Driver[];
}

const initialState: InitialState = {
  drivers: [],
};

export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    SET_DRIVERS: (state, action: PayloadAction<Driver[]>) => {
      state.drivers = action.payload;
    },
  },
});

export const { SET_DRIVERS } = driversSlice.actions;
export default driversSlice.reducer;
