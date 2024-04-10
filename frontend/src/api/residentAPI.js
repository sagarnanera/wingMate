// resident APIs

import { post, get, put, deleteReq } from "../utils/request";

export const getResidents = async (params) => {
  const response = await get(`/user/users`, { params });
  return response.data;
};

export const getResident = async (id) => {
  const response = await get(`/residents/${id}`);
  return response.data;
};

export const createResident = async (data) => {
  const response = await post(`/residents`, data);
  return response.data;
};

export const createResidents = async (data) => {
  const response = await post(`/residents/bulk`, data);
  return response.data;
};

export const updateResident = async (id, data) => {
  const response = await put(`/residents/${id}`, data);
  return response.data;
};

export const deleteResident = async (id) => {
  const response = await deleteReq(`/residents/${id}`);
  return response.data;
};
