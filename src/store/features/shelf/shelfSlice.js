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
  },
});

export const { createShelf } = shelfSlice.actions;
export default shelfSlice.reducer;
