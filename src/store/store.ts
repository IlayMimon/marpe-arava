import { configureStore } from "@reduxjs/toolkit";
import { shuttlesSlice } from "./slices/shuttlesSlice";

const store = configureStore({reducer: {
    shuttlesSlice,
}})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;