// like APIs

import { post, get } from "../utils/request";

export const toggleLikePost = async (postId) => {
  const response = await post(`/likes/${postId}`);
  return response.data;
};

export const getLikes = async (postId) => {
  const response = await get(`/likes/${postId}`);
  return response.data;
};

export const getLikedUsersList = async (entityId) => {
  const response = await get(`/likes/${entityId}`);
  return response.data;
};

// export const getLikedPostsList = async (userId) => {
//   const response = await get(`/likes/${userId}`);
//   return response.data
// };
