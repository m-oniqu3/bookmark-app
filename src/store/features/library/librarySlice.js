import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  library: [],
  bookAlreadyInLibraryCategory: "",
  feedback: {
    title: "",
    message: "",
    type: "",
  },
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addBookToLibrary: (state, action) => {
      const data = action.payload; //{bookData, category, timeAdded}'

      // Check if book is already in library
      const bookAlreadyInLibrary = state.library.find(
        (book) => book.bookData.id === data.bookData.id
      );

      if (!bookAlreadyInLibrary) {
        state.library.unshift(data);
        state.feedback = {
          title: "Success",
          message: "Book added to library",
          type: "success",
        };
      } else if (bookAlreadyInLibrary) {
        // If book is already in library, check if it is in the same category
        if (bookAlreadyInLibrary.category === data.category) {
          state.feedback = {
            title: "Warning",
            message: "This book is already in your library in this category",
            type: "warning",
          };
          alert(state.feedback.message);
        } else {
          //if the categories are different, update the category and timeAdded of the bookAlreadyInLibrary object

          bookAlreadyInLibrary.category = data.category;
          bookAlreadyInLibrary.timeAdded = Date.now();
          state.feedback = {
            title: "Information",
            message: "Book has been added to your library.",
            type: "info",
          };
        }
      }
    },
    checkIfBookAlreadyExists: (state, action) => {
      const data = action.payload;
      const bookAlreadyInLibrary = state.library.find(
        (book) => book.bookData.id === data.id
      );
      if (bookAlreadyInLibrary)
        state.bookAlreadyInLibraryCategory = bookAlreadyInLibrary.category;
      else state.bookAlreadyInLibraryCategory = "";
    },
  },
});

export const { addBookToLibrary, checkIfBookAlreadyExists } =
  librarySlice.actions;
export default librarySlice.reducer;
