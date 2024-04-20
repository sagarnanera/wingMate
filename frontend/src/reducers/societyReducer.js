// society reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  society: null,
  loading: false,
  error: null,
};

const societySlice = createSlice({
  name: "society",
  initialState,
  reducers: {
    setSociety: (state, action) => {
      state.society = action.payload;
    },
    societyLoading: (state, action) => {
      state.loading = action.payload;
    },
    societyError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("getSociety/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getSociety/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getSociety/fulfilled", (state, action) => {
      state.society = action.payload;
      state.loading = false;
    });
    
    builder.addCase("updateSociety/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("updateSociety/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("updateSociety/fulfilled", (state, action) => {
      state.society = action.payload;
      state.loading = false;
    });

    builder.addCase("deleteSociety/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteSociety/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteSociety/fulfilled", (state, action) => {
      state.society = null;
      state.loading = false;
    });
  },
});

export const { setSociety, societyError, societyLoading } =
  societySlice.actions;

export default societySlice.reducer;
