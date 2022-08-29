import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, isSignedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, isSignedIn } = action.payload;

      state.user = user;
      state.isSignedIn = isSignedIn;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
