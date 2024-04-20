// society actions

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSociety, updateSociety } from "../api/societyAPI";
import { setSociety } from "../reducers/societyReducer";

export const getSocietyAction = createAsyncThunk(
  "getSociety",
  async (societyId, { rejectWithValue, dispatch }) => {
    try {
      const response = await getSociety(societyId);

      if (!response.success || !response.society) {
        return rejectWithValue(response.message);
      }

      dispatch(setSociety(response.society));

      return response.society;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSocietyAction = createAsyncThunk(
  "updateSociety",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateSociety(data);

      if (!response.success || !response.society) {
        return rejectWithValue(response.message);
      }

      dispatch(setSociety(response.society));

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const deleteSocietyAction = createAsyncThunk(
//   "deleteSociety",
//   async (societyId, { rejectWithValue }) => {
//     try {
//       const response = await deleteSociety(societyId);

//       if (!response.success) {
//         return rejectWithValue(response.message);
//       }

//       return societyId;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
