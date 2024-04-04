// resident reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  residents: [],
  loading: false,
  error: null,
};

const residentSlice = createSlice({
  name: "resident",
  initialState,
  reducers: {
    setResidents(state, action) {
      state.residents = action.payload;
      state.loading = false;
    },
    getResidents(state, action) {
      state.residents = action.payload;
      state.loading = false;
    },
    deleteResident(state, action) {
      state.residents = state.residents.filter(
        (resident) => resident._id !== action.payload
      );
      state.loading = false;
    },
    residentError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("getResidents/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getResidents/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getResidents/fulfilled", (state, action) => {
      state.residents = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteResident/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteResident/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteResident/fulfilled", (state, action) => {
      state.residents = state.residents.filter(
        (resident) => resident._id !== action.payload
      );
      state.loading = false;
    });
  },
});

export const { setResidents, getResidents, deleteResident, residentError } =
  residentSlice.actions;

export default residentSlice.reducer;
