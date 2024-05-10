// auth APIs

import { post } from "../utils/request";

export const login = async (data) => {
  const response = await post(`/auth/login`, data);
  // console.log("response in req", response);
  return response.data;
};

export const register = async (data) => {
  const token = data.token;
  delete data.token;
  const response = await post(
    `/auth/register?invitationToken=${token || ""}`,
    data
  );
  return response.data;
};

export const societyRegister = async (data) => {
  const response = await post(`/society/register`, data);
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
