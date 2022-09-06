import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shelf: {},
  isShelfEmpty: true,
  currentBookShelves: [],
  shelfFeedback: { message: "", type: "" },
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {
    createShelf: (state, action) => {
      const data = action.payload; //shelfname

      //check if shelf length is greater than 15
      if (state.shelf?.shelves?.length === 15) {
        state.shelfFeedback = {
          message: "You can only have 15 shelves",
          type: "error",
        };
      } else {
        // Check if shelf already exists ,shelf is {booksOnShelves: [], shelves:[]}
        const shelfAlreadyExists = state.shelf?.shelves?.find(
          (record) => record === data
        );
        if (!shelfAlreadyExists) {
          const previousBooksOnShelves = state.shelf?.booksOnShelves || [];
          state.shelf = {
            shelves: [data, ...(state.shelf.shelves ?? "")],
            booksOnShelves: [...previousBooksOnShelves],
          };
          state.shelfFeedback = { message: "Shelf created", type: "success" };
        } else if (shelfAlreadyExists) {
          state.shelfFeedback = {
            message: "Shelf already exists",
            type: "warning",
          };
        }
      }
    },
    removeShelf: (state, action) => {
      const shelfToRemove = action.payload; //shelfname

      //remove shelf from shelves array
      state.shelf.shelves.splice(state.shelf.shelves.indexOf(shelfToRemove), 1);

      //find all the books on the shelf that includes the shelfToRemove and remove it
      state.shelf.booksOnShelves?.forEach((book) => {
        book.shelf.forEach((item) => {
          if (item.shelf === shelfToRemove)
            book.shelf.splice(book.shelf.indexOf(item), 1);
        });
      });
      state.shelfFeedback = { message: "Shelf removed", type: "info" };
    },
    renameShelf: (state, action) => {
      const { oldShelfName, newShelfName } = action.payload;

      //find the shelf in shelves array and rename it
      const shelfIndex = state.shelf.shelves.indexOf(oldShelfName);
      state.shelf.shelves[shelfIndex] = newShelfName;

      //find all the books on the shelf that includes the shelf they are trying to rename
      state.shelf.booksOnShelves?.forEach((book) => {
        book.shelf.forEach((item) => {
          if (item.shelf === oldShelfName) item.shelf = newShelfName;
        });
      });

      state.shelfFeedback = { message: "Shelf renamed", type: "info" };
    },
    checkIfUserHasShelves: (state, action) => {
      //check if user has shelves
      if (
        state.shelf?.shelves?.length === 0 ||
        state.shelf?.shelves === [] ||
        state.shelf?.shelves === undefined
      )
        state.isShelfEmpty = true;
      else state.isShelfEmpty = false;
    },
    getShelvesForCurrentBook: (state, action) => {
      const data = action.payload;

      const shelvesForBook = state.shelf?.booksOnShelves?.find(
        (book) => book.bookData.id === data.id
      );
      const shelves = shelvesForBook?.shelf?.map((item) => item.shelf);

      state.currentBookShelves = shelves ?? [];
    },
    addToShelf: (state, action) => {
      const { bookData, shelf, timeAdded } = action.payload; //{bookData, shelf, timeAdded}

      //check if the book they are trying to add already exists
      const bookAlreadyExists = state.shelf.booksOnShelves.find(
        (book) => book.bookData.id === bookData.id
      );

      if (!bookAlreadyExists) {
        state.shelf.booksOnShelves.push({
          bookData,
          shelf: [{ shelf, timeAdded }],
        });
        state.shelfFeedback = {
          message: "Book added to shelf",
          type: "success",
        };
      } else if (bookAlreadyExists) {
        //check if the shelf they are trying to add to already exists
        const shelfExists = bookAlreadyExists.shelf.find(
          (book) => book.shelf === shelf
        );

        if (shelfExists) {
          //find the index of the shelf and remove it
          const index = bookAlreadyExists.shelf.findIndex(
            (book) => book.shelf === shelf
          );
          bookAlreadyExists.shelf.splice(index, 1);

          //if the shelf is empty for the book, remove the book from the booksOnShelves array
          if (bookAlreadyExists.shelf.length === 0) {
            state.shelf.booksOnShelves.splice(
              state.shelf.booksOnShelves.indexOf(bookAlreadyExists),
              1
            );
          }

          state.shelfFeedback = {
            message: "Book removed from shelf",
            type: "info",
          };
        } else {
          //if the book exists but the shelves are different, update the shelf
          bookAlreadyExists.shelf.unshift({ shelf, timeAdded });

          state.shelfFeedback = {
            message: "Book added to shelf",
            type: "success",
          };
        }
      }
    },
    removeBookFromAllShelves: (state, action) => {
      const bookId = action.payload; //bookId

      //remove the book from all shelves
      state.shelf?.booksOnShelves?.forEach((book) => {
        if (book.bookData.id === bookId) {
          state.shelf.booksOnShelves.splice(
            state.shelf.booksOnShelves.indexOf(book),
            1
          );
        }
      });
    },
    updateShelf: (state, action) => {
      state.shelf = action.payload;
      if (action.payload?.shelves?.length === 0) state.isShelfEmpty = true;
      else state.isShelfEmpty = false;
    },
    clearShelf: (state) => {
      state.shelf = {};
      state.isShelfEmpty = true;
      state.currentBookShelves = [];
      state.shelfFeedback = { message: "", type: "" };
    },
  },
});

export const {
  createShelf,
  removeShelf,
  renameShelf,
  checkIfUserHasShelves,
  getShelvesForCurrentBook,
  addToShelf,
  removeBookFromAllShelves,
  updateShelf,
  clearShelf,
} = shelfSlice.actions;
export default shelfSlice.reducer;
