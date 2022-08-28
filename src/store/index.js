import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import library from "./features/library/librarySlice";
import shelf from "./features/shelf/shelfSlice";
import user from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    bookStore: library,
    bookShelf: shelf,
    auth: user,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
