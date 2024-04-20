// property reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties(state, action) {
      state.properties = action.payload;
      state.loading = false;
    },
    getProperties(state, action) {
      state.properties = action.payload;
      state.loading = false;
    },
    deleteProperty(state, action) {
      state.properties = state.properties.filter(
        (property) => property._id !== action.payload
      );
      state.loading = false;
    },
    propertyError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("getProperties/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getProperties/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getProperties/fulfilled", (state, action) => {
      state.properties = action.payload;
      state.loading = false;
    });
    builder.addCase("getProperty/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getProperty/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getProperty/fulfilled", (state, action) => {
      state.properties = action.payload;
      state.loading = false;
    });
    builder.addCase("createProperty/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("createProperty/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("createProperty/fulfilled", (state, action) => {
      state.properties.push(action.payload);
      state.loading = false;
    });
    builder.addCase("updateProperty/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("updateProperty/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("updateProperty/fulfilled", (state, action) => {
      state.properties = state.properties.map((property) =>
        property._id === action.payload._id ? action.payload : property
      );
      state.loading = false;
    });
    builder.addCase("deleteProperty/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteProperty/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteProperty/fulfilled", (state, action) => {
      state.properties = state.properties.filter(
        (property) => property._id !== action.payload
      );
      state.loading = false;
    });
  },
});

export const { setProperties, getProperties, deleteProperty, propertyError } =
  propertySlice.actions;

export default propertySlice.reducer;
