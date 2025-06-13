// File: store.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { Persistor, persistStore } from "redux-persist";
import persistedReducer from "../reducer/rootReducer";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/REGISTER",
        ],
      },
    }),
});

// Optional: if you need the persistor for manual purging
export const persistor: Persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
