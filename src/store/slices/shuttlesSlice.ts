import { createSlice } from '@reduxjs/toolkit';
import { Shuttle } from '../../hooks/data/useGetShuttles';

interface InitialState {
  shuttles: Shuttle[];
}

const initialState: InitialState = { shuttles: [] };

export const shuttlesSlice = createSlice({
  name: 'shuttles',
  initialState,
  reducers: {
    SET_SHUTTLES: (state, action) => {
      state.shuttles = action.payload;
    },
  },
});

export const { SET_SHUTTLES } = shuttlesSlice.actions;
