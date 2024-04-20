// booking actions

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  changeBookingStatus,
} from "../api/bookingAPI";

export const getBookingsAction = createAsyncThunk(
  "getBookings",
  async ({ filters }, { rejectWithValue }) => {
    try {
      const params = {};

      if (filters) {
        Object.assign(params, { filters });
      }

      const response = await getBookings(params);

      console.log(response);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.bookings;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBookingAction = createAsyncThunk(
  "getBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await getBooking(bookingId);

      console.log(bookingId, response.booking);

      if (!response.success || !response.booking) {
        return rejectWithValue(response.message);
      }

      return response.booking;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBookingAction = createAsyncThunk(
  "createBooking",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createBooking(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.booking;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBookingAction = createAsyncThunk(
  "updateBooking",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateBooking(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.booking;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBookingAction = createAsyncThunk(
  "deleteBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await deleteBooking(bookingId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return bookingId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeBookingStatusAction = createAsyncThunk(
  "changeBookingStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await changeBookingStatus(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.booking;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
