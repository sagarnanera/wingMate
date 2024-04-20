// post reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  activePost: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    setPosts(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    postError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    postLoading(state) {
      state.loading = true;
    },
    setLikeCount(state, action) {
      state.posts = state.posts.map((post) => {
        // return post._id === action.payload
        //   ? { ...post, totalLikes: post.totalLikes + 1 }
        //   : post;
        if (post._id === action.payload) {
          if (post.isLiked) {
            // post.totalLikes = post.totalLikes - 1;
            // post.isLiked = false;
            Object.assign(post, {
              totalLikes: post.totalLikes - 1,
              isLiked: false,
            });
          } else {
            // post.totalLikes = post.totalLikes + 1;
            // post.isLiked = true;
            Object.assign(post, {
              totalLikes: post.totalLikes + 1,
              isLiked: true,
            });
          }
        }
        return post;
      });
    },
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
      // state.posts = action.payload;
      state.activePost = action.payload;
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

    builder.addCase("updatePost/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("updatePost/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("updatePost/fulfilled", (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.loading = false;
    });

    builder.addCase("createPost/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("createPost/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("createPost/fulfilled", (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
    });

    builder.addCase("deletePost/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deletePost/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deletePost/fulfilled", (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    });

    // builder.addCase("toggleLikePost/pending", (state) => {
    //   state.loading = true;
    // });
    // builder.addCase("toggleLikePost/rejected", (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // });
    // builder.addCase("toggleLikePost/fulfilled", (state, action) => {
    //   state.posts = state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    //   state.loading = false;
    // });
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

export const { getPost, getPosts, postError, setLikeCount } = postSlice.actions;
export default postSlice.reducer;
