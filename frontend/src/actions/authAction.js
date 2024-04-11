// auth actions

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  login,
  register,
  logout,
  societyRegister,
  forgotPassword,
} from "../api/authAPI";
import { setUser } from "../reducers/userReducer";
import { setSociety } from "../reducers/societyReducer";
import { showToast } from "../utils/showToast";

export const loginAction = createAsyncThunk(
  "login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await login(data);

      if (!response.success || !response.user || !response.society) {
        return rejectWithValue(response.message);
      }

      showToast("Login Successful!", "success");

      dispatch(setUser(response.user));
      dispatch(setSociety(response.society));
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAction = createAsyncThunk(
  "register",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await register(data);

      if (!response.success || !response.user) {
        showToast(
          `${response.message} \n ${response.err.map((e) => "\n" + e.message)}`,
          "error"
        );
        return rejectWithValue(response.message);
      }

      showToast("Registration Successful!", "success");

      dispatch(setUser(response.user));

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const societyRegisterAction = createAsyncThunk(
  "societyRegister",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await societyRegister(data);

      if (!response.success || !response.user || !response.society) {
        showToast(
          `${response.message} \n ${response.err.map((e) => "\n" + e.message)}`,
          "error"
        );
        return rejectWithValue(response.message);
      }

      console.log("s", response);

      showToast("Society Registration Successful!", "success");

      dispatch(setUser(response.user));
      dispatch(setSociety(response.society));

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await logout(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      showToast("Logout Successful!", "success");

      dispatch(setUser(null));
      dispatch(setSociety(null));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// TODO: complete
export const forgotPasswordAction = createAsyncThunk(
  "forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await forgotPassword(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
