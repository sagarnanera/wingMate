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
      state.loading = true;
    });
    builder.addCase("login/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("login/fulfilled", (state, action) => {
      state.loading = false;
    });

    builder.addCase("register/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("register/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("register/fulfilled", (state, action) => {
      state.loading = false;
    });

    builder.addCase("societyRegister/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("societyRegister/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("societyRegister/fulfilled", (state, action) => {
      state.loading = false;
    });

    builder.addCase("forgotPassword/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("forgotPassword/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("forgotPassword/fulfilled", (state, action) => {
      state.loading = false;
    });

    builder.addCase("logout/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("logout/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("logout/fulfilled", (state, action) => {
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
