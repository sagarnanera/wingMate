// engagement reducer, which will handle the like, comment, share and save actions.

// we need to associate the engagement slice with the post, so that we can keep the track of likes and comments for each post.
// we will create a new slice called engagementSlice.js inside the reducers folder.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likes: null,
  comments: null,
  loading: false,
  error: null,
};

const engagementSlice = createSlice({
  name: "engagement",
  initialState,
  reducers: {
    setLikes(state, action) {
      state.likes = action.payload;
      state.loading = false;
    },
    setComments(state, action) {
      state.comments = action.payload;
      state.loading = false;
    },
    engagementError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("likePost/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("likePost/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("likePost/fulfilled", (state, action) => {
      state.likes = action.payload;
      state.loading = false;
    });

    builder.addCase("getComments/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("getComments/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("getComments/fulfilled", (state, action) => {
      // state.comments = action.payload;
      const comments = action.payload;

      // TODO: check this again
      if (state.comments) {
        if (comments.length > 0) {
          state.comments.push(comments);
        }
      } else {
        state.comments = comments;
      }
      state.loading = false;
    });

    builder.addCase("createComment/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("createComment/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("createComment/fulfilled", (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
    });

    builder.addCase("deleteComment/pending", (state) => {
      state.loading = true;
    });
    builder.addCase("deleteComment/rejected", (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase("deleteComment/fulfilled", (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
      state.loading = false;
    });

    // reducers for save post and share post
  },
});

// export const getCommentsByPostId = (state, postId) => {
//   return state.engagement.comments.filter(
//     (comment) => comment.postId === postId
//   );
// };

// export const getLikesByPostId = (state, postId) => {
//   return state.engagement.likes.filter((like) => like.postId === postId);
// };

export const getEngagementByPostId = (engagement, postId) => {
  return {
    // handle case if comments or likes are null,
    comments: engagement.comments
      ? engagement.comments.filter((comment) => comment.postId === postId)
      : [],
    // likes: engagement.likes
    //   ? engagement.likes.filter((like) => like.postId === postId)
    //   : [],
  };
};

export const { setLikes, setComments, engagementError } =
  engagementSlice.actions;

export default engagementSlice.reducer;
