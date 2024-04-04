// property APIs

import request from "../utils/request";

export const getProperties = async (params) => {
  const response = await request.get(`/properties`, { params });
  return response.data;
};

export const getProperty = async (id) => {
  const response = await request.get(`/properties/${id}`);
  return response.data;
};

export const createProperty = async (data) => {
  const response = await request.post(`/properties`, data);
  return response.data;
};

export const updateProperty = async (id, data) => {
  const response = await request.put(`/properties/${id}`, data);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await request.delete(`/properties/${id}`);
  return response.data;
};
