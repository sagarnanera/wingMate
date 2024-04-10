// user actions

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, updateUser } from "../api/userAPI";

export const getUserAction = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUser(data);

      if (!response.success || !response.data) {
        return rejectWithValue(response.message);
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
