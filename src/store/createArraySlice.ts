import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// helper function created to reduce boilerplate code and reduce maintenance times when adding new actions
// instead of creating a slice "manually", call this function like this:
// const exampleSlice = createArraySlice<Example[]>("examples");

// used when the state is just an array that needs to be replaced when updating, like when pulling a SharePoint list

const createArraySlice = <T extends unknown[]>(name: string) => {
  const initialState: T = [] as unknown[] as T;

  const actionName = `set${name.charAt(0).toUpperCase()}${name.slice(1)}` as const;

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      [actionName]: (_state, action: PayloadAction<T>) => action.payload,
    },
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions as {
      [K in typeof actionName]: (payload: T) => {
        type: string;
        payload: T;
      };
    },
  };
};

export default createArraySlice;
