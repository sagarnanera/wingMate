// request

import axios from "axios";
import { API_URL } from "./constants";

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    return {
      ...config,
      validateStatus: function (status) {
        return status < 500;
      },
    };
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);

export const get = async (url, params) => {
  return request.get(url, params);
};

export const post = async (url, data) => {
  return request.post(url, data);
};

export const put = async (url, data) => {
  return request.put(url, data);
};

export const patch = async (url, data) => {
  return request.patch(url, data);
};

export const deleteReq = async (url) => {
  return request.delete(url);
};

export default request;
