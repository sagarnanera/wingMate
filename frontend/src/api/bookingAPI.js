// booking APIs

import { post, get, deleteReq, put, patch } from "../utils/request";

export const getBookings = async (params) => {
  console.log(params);
  const response = await get(`/booking`, { params });
  return response.data;
};

export const getBooking = async (id) => {
  const response = await get(`/booking/${id}`);
  return response.data;
};

export const createBooking = async (data) => {
  const response = await post(`/booking`, data);
  return response.data;
};

export const updateBooking = async (id, data) => {
  const response = await put(`/booking/${id}`, data);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await deleteReq(`/booking/${id}`);
  return response.data;
};

export const changeBookingStatus = async (id, data) => {
  const response = await patch(`/bookings/${id}`, data);
  return response.data;
};
