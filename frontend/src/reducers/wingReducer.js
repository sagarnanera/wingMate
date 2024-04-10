// wing reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wings: [],
  // wing: null,
  loading: false,
  error: null,
};

const wingSlice = createSlice({
  name: "wing",
  initialState,
  reducers: {
    setWings(state, action) {
      state.wings = action.payload;
      state.loading = false;
    },
    getWing(state, action) {
      state.wings = action.payload;
      state.loading = false;
    },
    deleteWing(state, action) {
      state.wings = state.wings.filter((wing) => wing._id !== action.payload);
      state.loading = false;
    },
    wingError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("getWings/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getWings/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getWings/fulfilled", (state, action) => {
      state.wings = action.payload;
      state.loading = false;
    });
    
    builder.addCase("getWing/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getWing/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getWing/fulfilled", (state, action) => {
      state.wings = action.payload;
      state.loading = false;
    });

    builder.addCase("createWing/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("createWing/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("createWing/fulfilled", (state, action) => {
      state.wings = action.payload;
      state.loading = false;
    });

    builder.addCase("updateWing/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("updateWing/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("updateWing/fulfilled", (state, action) => {
      state.wings = action.payload;
      state.loading = false;
    });

    builder.addCase("deleteWing/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteWing/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteWing/fulfilled", (state, action) => {
      state.wings = action.payload;
      state.loading = false;
    });
  },
});

export const { setWings, getWing, deleteWing, wingError } = wingSlice.actions;

export default wingSlice.reducer;
