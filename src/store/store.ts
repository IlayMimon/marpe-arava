import { configureStore } from "@reduxjs/toolkit";
import shuttlesSlice from "./slices/shuttlesSlice";
import driversDataSlice from "./slices/driversDataSlice";
import driversSlice from "./slices/driversSlice";
import medicsSlice from "./slices/medicsSlice";
import servicesSlice from "./slices/servicesSlice";
import shuttleDetailsPerRequestSlice from "./slices/shuttleDetailsPerRequestSlice";
import stationsSlice from "./slices/stationsSlice";

const store = configureStore({
  reducer: {
    shuttles: shuttlesSlice,
    drivers: driversSlice,
    driversData: driversDataSlice,
    medics: medicsSlice,
    services: servicesSlice,
    shuttleDetailsPerRequest: shuttleDetailsPerRequestSlice,
    stations: stationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
