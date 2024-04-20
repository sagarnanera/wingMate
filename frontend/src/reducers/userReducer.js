// user reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    getUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    userError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("getUser/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getUser/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getUser/fulfilled", (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export const { setUser, getUser, userError } = userSlice.actions;
export default userSlice.reducer;
