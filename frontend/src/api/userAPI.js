// user APIs

import { post, get } from "../utils/request";

export const getUser = async () => {
  const response = await get(`/user`);
  return response.data;
};

export const updateUser = async (data) => {
  const response = await post(`/user`, data);
  return response.data;
};
