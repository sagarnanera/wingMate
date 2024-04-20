// post actions

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../api/postAPI";

export const getPostsAction = createAsyncThunk(
  "getPosts",
  async ({ feed, userId }, { rejectWithValue }) => {
    try {
      const params = {};

      if (feed) {
        Object.assign(params, { feed });
      }

      if (userId) {
        Object.assign(params, { userId });
      }

      const response = await getPosts(params);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostAction = createAsyncThunk(
  "getPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getPost(postId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.post;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPostAction = createAsyncThunk(
  "createPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createPost(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.post;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "updatePost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updatePost(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.post;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await deletePost(postId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return postId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
