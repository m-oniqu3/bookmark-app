import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shelf: {},
  isShelfEmpty: true,
  currentBookShelves: [],
  shelfFeedback: {
    title: "",
    message: "",
    type: "",
  },
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
          title: "Error",
          message: "You can only have 15 shelves",
          type: "error",
        };
        alert(state.shelfFeedback.message);
      } else {
        // Check if shelf already exists ,shelf is {booksOnShelves: [], shelves:[]}
        const shelfAlreadyExists = state.shelf?.shelves?.find(
          (record) => record === data
        );
        if (!shelfAlreadyExists) {
          state.shelf = {
            shelves: [data, ...(state.shelf.shelves ?? "")],
            booksOnShelves: [],
          };
          state.shelfFeedback = {
            title: "Success",
            message: "Shelf created",
            type: "success",
          };
        } else if (shelfAlreadyExists) {
          state.shelfFeedback = {
            title: "Warning",
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
      state.shelfFeedback = {
        title: "Information",
        message: "Shelf removed",
        type: "info",
      };
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

      state.shelfFeedback = {
        title: "Information",
        message: "Shelf renamed",
        type: "info",
      };
    },
    checkIfUserHasShelves: (state, action) => {
      const { shelves } = state.shelf;
      state.isShelfEmpty = shelves?.length === 0;
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
          title: "Success",
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
            title: "Information",
            message: "Book removed from shelf",
            type: "info",
          };
        } else {
          //if the book exists but the shelves are different, update the shelf
          bookAlreadyExists.shelf.unshift({ shelf, timeAdded });

          state.shelfFeedback = {
            title: "Success",
            message: "Book added to shelf",
            type: "success",
          };
        }
      }
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
} = shelfSlice.actions;
export default shelfSlice.reducer;

//    booksOnShelves
//      ?.filter((book) => book.shelf.find((item) => item.shelf === data.shelf))
//      ?.forEach((book) => {
//        book.shelf.forEach((item) => {
//          if (item.shelf === oldShelfName) item.shelf = newShelfName;
//        });
//      });
