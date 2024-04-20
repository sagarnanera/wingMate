// engagement actions, which will handle the like, comment, share and save actions.

import { createAsyncThunk } from "@reduxjs/toolkit";

import { toggleLikePost, getLikes, getLikedUsersList } from "../api/likeAPI";
import { createComment, deleteComment, getComments } from "../api/commentsAPI";
import { setLikeCount } from "../reducers/postReducer";

export const likePostAction = createAsyncThunk(
  "likePost",
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      const response = await toggleLikePost(postId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      dispatch(setLikeCount(postId));

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLikesAction = createAsyncThunk(
  "getLikes",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getLikes(postId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.likes;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLikedUsersListAction = createAsyncThunk(
  "getLikedUsersList",
  async (entityId, { rejectWithValue }) => {
    try {
      const response = await getLikedUsersList(entityId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.likedUsers;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCommentAction = createAsyncThunk(
  "createComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createComment(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.comment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCommentAction = createAsyncThunk(
  "deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await deleteComment(commentId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return commentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommentsAction = createAsyncThunk(
  "getComments",
  async (postId, { rejectWithValue }) => {
    try {
      console.log("postId: ", postId);

      const response = await getComments(postId);

      console.log("response: ", response);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.comments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
