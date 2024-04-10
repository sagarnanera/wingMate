// booking reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
    bookingError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleBookingStatus(state, action) {
      state.bookings = state.bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase("getBooking/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getBooking/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getBooking/fulfilled", (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    });
    builder.addCase("getBookings/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getBookings/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getBookings/fulfilled", (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    });
    builder.addCase("createBooking/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("createBooking/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("createBooking/fulfilled", (state, action) => {
      state.bookings.push(action.payload);
      state.loading = false;
    });
    builder.addCase("updateBooking/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("updateBooking/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("updateBooking/fulfilled", (state, action) => {
      state.bookings = state.bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
      state.loading = false;
    });
    builder.addCase("deleteBooking/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteBooking/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteBooking/fulfilled", (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking._id !== action.payload._id
      );
      state.loading = false;
    });
    builder.addCase("changeBookingStatus/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("changeBookingStatus/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("changeBookingStatus/fulfilled", (state, action) => {
      state.bookings = state.bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
      state.loading = false;
    });
  },
});

export const { setBooking, setBookings, bookingError, toggleBookingStatus } =
  bookingSlice.actions;

export default bookingSlice.reducer;
