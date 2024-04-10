// post reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPost(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    getPosts(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    postError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleLikePost(state, action) {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    // addComment(state, action) {
    //   state.posts = state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    // },
    // deleteComment(state, action) {
    //   state.posts = state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder.addCase("getPost/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getPost/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getPost/fulfilled", (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase("getPosts/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getPosts/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getPosts/fulfilled", (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase("toggleLikePost/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("toggleLikePost/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("toggleLikePost/fulfilled", (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.loading = false;
    });
    // builder.addCase("addComment/pending", (state) => {
    //   state.loading = true;
    // });
    // builder.addCase("addComment/rejected", (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // });
    // builder.addCase("addComment/fulfilled", (state, action) => {
    //   state.posts = state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    //   state.loading = false;
    // });
    // builder.addCase("deleteComment/pending", (state) => {
    //   state.loading = true;
    // });
    // builder.addCase("deleteComment/rejected", (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // });
    // builder.addCase("deleteComment/fulfilled", (state, action) => {
    //   state.posts = state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    //   state.loading = false;
    // });
  },
});

export const { getPost, getPosts, postError } = postSlice.actions;
export default postSlice.reducer;
