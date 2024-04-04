// comment APIs

import { post, get, put, deleteReq } from "../utils/request";

export const getComments = async (postId, params) => {
  const response = await get(`/comments/${postId}`, { params });
  return response.data;
};

export const getComment = async (id) => {
  const response = await get(`/comments/${id}`);
  return response.data;
};

export const createComment = async (data) => {
  const response = await post(`/comments`, data);
  return response.data;
};

export const updateComment = async (id, data) => {
  const response = await put(`/comments/${id}`, data);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await deleteReq(`/comments/${id}`);
  return response.data;
};
