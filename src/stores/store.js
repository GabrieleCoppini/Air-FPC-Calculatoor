import { configureStore } from "@reduxjs/toolkit";
import airportsReducer from "../stores/airportsSlice";
import footprintReducer from "../stores/footprintSlice";
const store = configureStore({
  reducer: {
    airports: airportsReducer,
    footprint: footprintReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
