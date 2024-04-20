// like APIs

import { post, get } from "../utils/request";

export const toggleLikePost = async (postId) => {
  const response = await post(`/like/${postId}`);
  return response.data;
};

export const getLikes = async (postId) => {
  const response = await get(`/like/${postId}`);
  return response.data;
};

export const getLikedUsersList = async (entityId) => {
  const response = await get(`/like/${entityId}`);
  return response.data;
};

// export const getLikedPostsList = async (userId) => {
//   const response = await get(`/likes/${userId}`);
//   return response.data
// };
