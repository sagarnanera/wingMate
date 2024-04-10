// society APIs

import { post, get, deleteReq, put } from "../utils/request";

export const getSociety = async (id) => {
  const response = await get(`/society`);
  return response.data;
};

// export const createSociety = async (data) => {
//   const response = await post(`/society`, data);
//   return response.data;
// };

export const updateSociety = async (id, data) => {
  const response = await put(`/society/${id}`, data);
  return response.data;
};

// export const deleteSociety = async (id) => {
//   const response = await deleteReq(`/society/${id}`);
//   return response.data;
// };
