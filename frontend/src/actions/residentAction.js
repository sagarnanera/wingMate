// resident actions

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createResident,
  deleteResident,
  getResidents,
  getResident,
  updateResident,
  createResidents,
  resendInvitation,
} from "../api/residentAPI";
import { showToast } from "../utils/showToast";

export const getResidentsAction = createAsyncThunk(
  "getResidents",
  async ({ filters }, { rejectWithValue }) => {
    try {
      const params = {};

      if (filters) {
        Object.assign(params, { ...filters });
      }

      const response = await getResidents(params);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.residents || response.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getResidentAction = createAsyncThunk(
  "getResident",
  async (residentId, { rejectWithValue }) => {
    try {
      const response = await getResident(residentId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.resident || response.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createResidentAction = createAsyncThunk(
  "createResident",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createResident(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.resident || response.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createResidentsAction = createAsyncThunk(
  "createResidents",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createResidents(data);

      if (!response.success) {
        // format the existing emails to show in the toast message
        const existingEmails = response.existingEmails.join(", ");
        showToast(`${response.message} \n ${existingEmails}`, "error");

        return rejectWithValue(response.message);
      }

      showToast(
        response.message || "Residents added successfully!!!",
        "success"
      );

      return response.residents || response.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateResidentAction = createAsyncThunk(
  "updateResident",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateResident(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.resident || response.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteResidentAction = createAsyncThunk(
  "deleteResident",
  async (residentId, { rejectWithValue }) => {
    try {
      const response = await deleteResident(residentId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return residentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendInvitationAction = createAsyncThunk(
  "resendInvitation",
  async (residentId, { rejectWithValue }) => {
    try {
      const response = await resendInvitation(residentId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.resident || response.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
