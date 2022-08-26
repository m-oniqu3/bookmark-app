import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import library from "./features/library/librarySlice";
import shelf from "./features/shelf/shelfSlice";

export const store = configureStore({
  reducer: {
    bookStore: library,
    bookShelf: shelf,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
