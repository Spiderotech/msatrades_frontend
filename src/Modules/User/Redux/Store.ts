import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import cartReducer from "./reducer/cartSlice";
import wishlistReducer from "./reducer/wishlistSlice";
import { adminSlice } from "./reducer/AdminSlice"; // Assuming file name is AdminSlice.ts

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine Reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  admin: adminSlice.reducer, // ✅ Add admin reducer
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);


