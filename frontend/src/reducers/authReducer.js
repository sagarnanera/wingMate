// auth reducer

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { showToast } from "../utils/showToast";

const initialState = {
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.loading = false;
    },
    register(state) {
      state.loading = false;
    },
    societyRegister(state) {
      state.loading = false;
    },
    // forgotPassword(state, action) {
    //   state.loading = false;
    // },
    // logout(state) {
    //   state.loading = false;
    // },
    // authError(state, action) {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase("login/pending", (state) => {
      console.log("login/pending called");
      state.loading = true;
    });
    builder.addCase("login/rejected", (state, action) => {
      console.log("login/rejected called", action);
      showToast(action.payload, "error");
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("login/fulfilled", (state, action) => {
      console.log("login/fulfilled called");
      state.loading = false;
    });
    builder.addCase("register/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("register/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("societyRegister/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("societyRegister/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("forgotPassword/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("forgotPassword/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const {
  login,
  register,
  societyRegister,
  forgotPassword,
  logout,
  authError,
} = authSlice.actions;

export default authSlice.reducer;
