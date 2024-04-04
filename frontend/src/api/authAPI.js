// auth APIs

import { post } from "../utils/request";

export const login = async (data) => {
  const response = await post(`/auth/login`, data);
  // console.log("response in req", response);
  return response.data;
};

export const register = async (data) => {
  const response = await post(`/auth/register`, data);
  return response.data;
};

export const societyRegister = async () => {
  const response = await post(`/auth/society-register`);
  return response.data;
};

export const logout = async () => {
  const response = await post(`/auth/logout`);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await post(`/auth/forgot-password`, data);
  return response.data;
};
