import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  library: [],
  bookAlreadyInLibraryCategory: "",
  feedback: { message: "", type: "" },
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
        state.feedback = { message: "Book added to library", type: "success" };
      } else if (bookAlreadyInLibrary) {
        // If book is already in library, check if it is in the same category
        if (bookAlreadyInLibrary.category === data.category) {
          state.feedback = {
            message: "This book is already in your library in this category",
            type: "warning",
          };
        } else {
          //if the categories are different, update the category and timeAdded of the bookAlreadyInLibrary object

          bookAlreadyInLibrary.category = data.category;
          bookAlreadyInLibrary.timeAdded = Date.now();
          state.feedback = {
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
      const bookId = action.payload; //bookid

      // remove the book from the library
      state.library = state.library.filter(
        (book) => book.bookData.id !== bookId
      );

      state.feedback = { message: "Book removed from library.", type: "info" };

      return state;
    },
    updateLibrary: (state, action) => {
      state.library = action.payload;
    },
    clearLibrary: (state) => {
      state.library = [];
      state.bookAlreadyInLibraryCategory = "";
      state.feedback = { message: "", type: "" };
    },
  },
});

export const {
  addBookToLibrary,
  checkIfBookAlreadyExists,
  removeBookFromLibrary,
  updateLibrary,
  clearLibrary,
} = librarySlice.actions;
export default librarySlice.reducer;
