// event actions

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventParticipants,
  changeEventStatus,
  getEvent,
} from "../api/eventAPI";

export const getEventsAction = createAsyncThunk(
  "getEvents",
  async ({ eventStatus }, { rejectWithValue }) => {
    try {
      const params = {};

      if (eventStatus) {
        Object.assign(params, { eventStatus });
      }

      const response = await getEvents(params);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.events;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEventAction = createAsyncThunk(
  "getEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await getEvent(eventId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.event;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEventAction = createAsyncThunk(
  "createEvent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createEvent(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.event;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEventAction = createAsyncThunk(
  "updateEvent",
  async ({ eventId, data }, { rejectWithValue }) => {
    try {
      const response = await updateEvent(eventId, data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.event;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEventAction = createAsyncThunk(
  "deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await deleteEvent(eventId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return eventId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEventParticipantsAction = createAsyncThunk(
  "getEventParticipants",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await getEventParticipants(eventId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.participants;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeEventStatusAction = createAsyncThunk(
  "changeEventStatus",
  async ({ eventId, data }, { rejectWithValue }) => {
    try {
      const response = await changeEventStatus(eventId, data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.event;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
