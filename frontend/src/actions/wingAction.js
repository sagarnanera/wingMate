// wing actions

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createWing,
  deleteWing,
  getWing,
  getWings,
  updateWing,
} from "../api/wingAPI";

export const getWingsAction = createAsyncThunk(
  "getWings",
  async ({ filters }, { rejectWithValue }) => {
    try {
      const params = {};

      if (filters) {
        Object.assign(params, { ...filters });
      }

      const response = await getWings(params);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.wings;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWingAction = createAsyncThunk(
  "getWing",
  async (wingId, { rejectWithValue }) => {
    try {
      const response = await getWing(wingId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.wing;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createWingAction = createAsyncThunk(
  "createWing",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createWing(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.wing;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateWingAction = createAsyncThunk(
  "updateWing",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateWing(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.wing;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteWingAction = createAsyncThunk(
  "deleteWing",
  async (wingId, { rejectWithValue }) => {
    try {
      const response = await deleteWing(wingId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return wingId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
