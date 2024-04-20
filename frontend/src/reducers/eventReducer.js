// event reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  activeEvent: {},
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent(state, action) {
      state.events = action.payload;
      state.loading = false;
    },
    setEvents(state, action) {
      state.events = action.payload;
      state.loading = false;
    },
    eventError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleEventStatus(state, action) {
      state.events = state.events.map((event) =>
        event._id === action.payload._id ? action.payload : event
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase("getEvent/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getEvent/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getEvent/fulfilled", (state, action) => {
      state.activeEvent = action.payload;
      state.loading = false;
    });

    builder.addCase("getEvents/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getEvents/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getEvents/fulfilled", (state, action) => {
      state.events = action.payload;
      state.loading = false;
    });

    builder.addCase("createEvent/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("createEvent/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("createEvent/fulfilled", (state, action) => {
      state.events.push(action.payload);
      state.loading = false;
    });

    builder.addCase("updateEvent/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("updateEvent/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("updateEvent/fulfilled", (state, action) => {
      state.events = state.events.map((event) =>
        event._id === action.payload._id ? action.payload : event
      );
      state.loading = false;
    });

    builder.addCase("deleteEvent/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteEvent/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteEvent/fulfilled", (state, action) => {
      state.events = state.events.filter(
        (event) => event._id !== action.payload._id
      );
      state.loading = false;
    });

    builder.addCase("changeEventStatus/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("changeEventStatus/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("changeEventStatus/fulfilled", (state, action) => {
      state.events = state.events.map((event) =>
        event._id === action.payload._id ? action.payload : event
      );
      state.loading = false;
    });
  },
});

export const { setEvent, setEvents, eventError, toggleEventStatus } =
  eventSlice.actions;

export default eventSlice.reducer;
