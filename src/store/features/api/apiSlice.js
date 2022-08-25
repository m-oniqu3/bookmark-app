import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/volumes",
  }),
  endpoints: (builder) => ({
    getSearchResults: builder.query({
      query: (searchQuery) =>
        `?q=${searchQuery}&orderBy=relevance&maxResults=28&key=${apiKey}`,
    }),
    getBookDetails: builder.query({
      query: (bookId) => `/${bookId}`,
    }),
  }),
});

export const { useGetSearchResultsQuery, useGetBookDetailsQuery } = apiSlice;
