// File: reducer/rootReducer.ts
import storage from "redux-persist/lib/storage";
import { combineReducers, AnyAction, Reducer } from "@reduxjs/toolkit";
import { persistReducer, PersistConfig } from "redux-persist";
import persistReducerSlice from "../features/persistSlice"; // .reducer will be accessed

// Combine your reducers
const appReducer = combineReducers({
  persist: persistReducerSlice,
});

// RootState inferred automatically
export type RootState = ReturnType<typeof appReducer>;

// Handle logout reset
const rootReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === "user/logout") {
    storage.removeItem("persist:root");
    state = undefined as unknown as RootState;
  }
  return appReducer(state, action);
};

// Persist config
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["persist"], // Only persist the `persist` slice
};

export default persistReducer(persistConfig, rootReducer);
