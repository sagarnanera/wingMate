// property actions

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  updateProperty,
} from "../api/propertyAPI";

export const getPropertiesAction = createAsyncThunk(
  "getProperties",
  async ({ filters }, { rejectWithValue }) => {
    try {
      const params = {};

      if (filters) {
        Object.assign(params, { ...filters });
      }

      const response = await getProperties(params);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.properties;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPropertyAction = createAsyncThunk(
  "getProperty",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await getProperty(propertyId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.property;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPropertyAction = createAsyncThunk(
  "createProperty",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createProperty(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.property;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePropertyAction = createAsyncThunk(
  "updateProperty",
  async ({ propertyId, data }, { rejectWithValue }) => {
    try {
      const response = await updateProperty(propertyId, data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.property;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePropertyAction = createAsyncThunk(
  "deleteProperty",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await deleteProperty(propertyId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return propertyId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
