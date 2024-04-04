// booking APIs

import { post, get, deleteReq, put, patch } from "../utils/request";

export const getBookings = async (params) => {
  const response = await get(`/bookings`, { params });
  return response.data;
};

export const getBooking = async (id) => {
  const response = await get(`/bookings/${id}`);
  return response.data;
};

export const createBooking = async (data) => {
  const response = await post(`/bookings`, data);
  return response.data;
};

export const updateBooking = async (id, data) => {
  const response = await put(`/bookings/${id}`, data);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await deleteReq(`/bookings/${id}`);
  return response.data;
};

export const changeBookingStatus = async (id, data) => {
  const response = await patch(`/bookings/${id}/status`, data);
  return response.data;
};
