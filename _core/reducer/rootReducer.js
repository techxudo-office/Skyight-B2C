/** @format */

"use client";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import roleReducer from "../features/roleSlice";
import persistedReducer from "../features/persistSlice";

const appReducer = combineReducers({
  role: roleReducer,
  persist: persistedReducer,
});

// Root reducer with optional global reset behavior
const rootReducer = (state, action) => {
  // If logout is dispatched, clear persisted data from storage
  if (action.type === "user/logout") {
    storage.removeItem("persist:root");

    // Reset state to undefined, effectively clearing all reducers
    return appReducer(undefined, action);
  }

  // Otherwise, proceed normally
  return appReducer(state, action);
};

// Wrap the root reducer with persistence configuration
const persistedReducers = persistReducer(
  {
    key: "root", // Key for persisted root object
    storage, // Use localStorage via redux-persist
    whitelist: ["persist"], // Only persist the "persist" slice
  },
  rootReducer
);

// Export persisted root reducer for use in store configuration
export default persistedReducers;
