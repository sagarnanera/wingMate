// property APIs

import request from "../utils/request";

export const getProperties = async (params) => {
  const response = await request.get(`/property`, { params });
  return response.data;
};

export const getProperty = async (id) => {
  const response = await request.get(`/property/${id}`);
  return response.data;
};

export const createProperty = async (data) => {
  const response = await request.post(`/property`, data);
  return response.data;
};

export const updateProperty = async (id, data) => {
  const response = await request.put(`/property/${id}`, data);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await request.delete(`/property/${id}`);
  return response.data;
};
