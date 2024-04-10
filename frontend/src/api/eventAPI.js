// event APIs

import { deleteReq, get, patch, post, put } from "../utils/request";

export const getEvents = async (params) => {
  const response = await get(`/event`, { params });
  return response.data;
};

export const getEvent = async (id) => {
  const response = await get(`/event/${id}`);
  return response.data;
};

export const createEvent = async (data) => {
  const response = await post(`/event`, data);
  return response.data;
};

export const updateEvent = async (id, data) => {
  const response = await put(`/event/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await deleteReq(`/event/${id}`);
  return response.data;
};

export const getEventParticipants = async (id) => {
  const response = await get(`/event/${id}/participants`);
  return response.data;
};

export const changeEventStatus = async (id, data) => {
  const response = await patch(`/event/${id}/status`, data);
  return response.data;
};
