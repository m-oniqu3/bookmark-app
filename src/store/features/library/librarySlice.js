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
        } else {
          //if the categories are different, update the category and timeAdded of the bookAlreadyInLibrary object

          bookAlreadyInLibrary.category = data.category;
          bookAlreadyInLibrary.timeAdded = Date.now();
          state.feedback = {
            title: "Information",
            message: "Book moved to new category",
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
    removeBookFromLibrary: (state, action) => {
      const data = action.payload; //bookid

      // remove the book from the library
      state.library = state.library.filter(
        (book) => book.bookData.id !== data.bookId
      );

      state.feedback = {
        title: "Information",
        message: "Book removed from library.",
        type: "info",
      };

      return state;
    },
  },
});

export const {
  addBookToLibrary,
  checkIfBookAlreadyExists,
  removeBookFromLibrary,
} = librarySlice.actions;
export default librarySlice.reducer;
