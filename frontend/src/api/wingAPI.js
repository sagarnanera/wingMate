// wing APIs

import { post, get, deleteReq, put } from "../utils/request";

export const getWings = async (params) => {
  const response = await get(`/wings`, { params });
  return response.data;
};

export const getWing = async (id) => {
  const response = await get(`/wings/${id}`);
  return response.data;
};

export const createWing = async (data) => {
  const response = await post(`/wings`, data);
  return response.data;
};

export const updateWing = async (id, data) => {
  const response = await put(`/wings/${id}`, data);
  return response.data;
};

export const deleteWing = async (id) => {
  const response = await deleteReq(`/wings/${id}`);
  return response.data;
};
