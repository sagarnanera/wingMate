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
import axios from "axios";

export const loginAction = createAsyncThunk(
  "login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      // const response = await login(data);

      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data,
        {
          withCredentials: true,
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        }
      );

      const response = res.data;

      if (!response.success || !response.user) {
        return rejectWithValue(response.message);
      }

      dispatch(setUser(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAction = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const societyRegisterAction = createAsyncThunk(
  "societyRegister",
  async (data, { rejectWithValue }) => {
    try {
      const response = await societyRegister(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const logoutAction = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await logout(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
