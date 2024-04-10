// wing APIs

import { post, get, deleteReq, put } from "../utils/request";

export const getWings = async (params) => {
  const response = await get(`/wing`, { params });
  return response.data;
};

export const getWing = async (id) => {
  const response = await get(`/wing/${id}`);
  return response.data;
};

export const createWing = async (data) => {
  const response = await post(`/wing`, data);
  return response.data;
};

export const updateWing = async (id, data) => {
  const response = await put(`/wing/${id}`, data);
  return response.data;
};

export const deleteWing = async (id) => {
  const response = await deleteReq(`/wing/${id}`);
  return response.data;
};
