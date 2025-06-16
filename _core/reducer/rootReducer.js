// File: reducer/rootReducer.ts
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistReducerSlice from "../features/persistSlice";

// Combine your reducers
const appReducer = combineReducers({
  persist: persistReducerSlice,
});

// Handle logout reset
const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["persist"], // Only persist the `persist` slice
};

export default persistReducer(persistConfig, rootReducer);
