// event APIs

import { deleteReq, get, patch, post, put } from "../utils/request";

export const getEvents = async (params) => {
  const response = await get(`/events`, { params });
  return response.data;
};

export const getEvent = async (id) => {
  const response = await get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (data) => {
  const response = await post(`/events`, data);
  return response.data;
};

export const updateEvent = async (id, data) => {
  const response = await put(`/events/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await deleteReq(`/events/${id}`);
  return response.data;
};

export const getEventParticipants = async (id) => {
  const response = await get(`/events/${id}/participants`);
  return response.data;
};

export const changeEventStatus = async (id, data) => {
  const response = await patch(`/events/${id}/status`, data);
  return response.data;
};
