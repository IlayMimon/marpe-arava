import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShuttleDetailsPerRequest } from "../../hooks/data/useGetShuttleDetailsPerRequest";

interface InitialState {
  today: ShuttleDetailsPerRequest[];
  tomorrow: ShuttleDetailsPerRequest[];
}

const initialState: InitialState = { today: [], tomorrow: [] };

const shuttleDetailsPerRequestSlice = createSlice({
  name: "shuttleDetailsPerRequest",
  initialState,
  reducers: {
    setTodayShuttleDetailsPerRequest: (state, action: PayloadAction<ShuttleDetailsPerRequest[]>) => {
      state.today = action.payload;
    },
    setTomorrowShuttleDetailsPerRequest: (state, action: PayloadAction<ShuttleDetailsPerRequest[]>) => {
      state.tomorrow = action.payload;
    },
  },
});

export const { setTodayShuttleDetailsPerRequest, setTomorrowShuttleDetailsPerRequest } = shuttleDetailsPerRequestSlice.actions;
export default shuttleDetailsPerRequestSlice.reducer;
