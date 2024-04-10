// post APIs

import { post, get, put, deleteReq } from "../utils/request";

export const getPosts = async (params) => {
  const response = await get(`/post`, { params });
  return response.data;
};

export const getPost = async (id) => {
  const response = await get(`/post/${id}`);
  return response.data;
};

export const createPost = async (data) => {
  const response = await post(`/post`, data);
  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await put(`/post/${id}`, data);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await deleteReq(`/post/${id}`);
  return response.data;
};
