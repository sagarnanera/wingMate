const { deleteComments } = require("../DB/comment.db");
const {
  insertPost,
  findPost,
  findPosts,
  updatePostData,
  deletePostData
} = require("../DB/post.db");
const { updateTotalPostCount } = require("../DB/user.db");
const { customError } = require("../handlers/error.handler");
const { postToFacebook } = require("../services/facebook.service");
const {
  POST_TYPE,
  POST_CONTENT_TYPE,
  FEED_TYPE
} = require("../utils/constants");
const { Promise } = require("bluebird");

exports.createPost = async (ctx) => {
  const { title, text, media, contentType, feed, shareToFB } = ctx.request.body;
  const { _id: userId, societyId, wingId } = ctx.request.user;

  const postData = {
    userId,
    societyId,
    wingId,
    title,
    totalLikes: 0,
    totalComments: 0,
    feed: FEED_TYPE.SOCIETY,
    postType: POST_TYPE.NORMAL_POST,
    contentType,
    createdOn: new Date()
  };

  if (feed === FEED_TYPE.WING) {
    postData["feed"] = FEED_TYPE.WING;
  }

  if (contentType === POST_CONTENT_TYPE.TEXT) {
    postData["text"] = text;
  } else {
    postData["media"] = media;
  }

  if (shareToFB) {
    try {
      const { postId: fbPostId } = await postToFacebook(postData);
      postData["fbPostId"] = fbPostId;
    } catch (error) {
      console.log("err in fb share", error);

      throw new customError("Unable to share post on facebook.", 400);
    }
  }

  const postPromise = insertPost(ctx.db, postData);

  // TODO : check better way to update the counter as if post doesn't get inserted it will still update the count
  const [post, _] = await Promise.all([
    postPromise,
    updateTotalPostCount(
      ctx.db,
      { _id: userId },
      {
        $inc: { totalPost: 1 }
      }
    )
  ]);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Post added successfully!!!",
    post
  };

  return;
};

exports.getPosts = async (ctx) => {
  const { societyId, wingId } = ctx.request.user;
  const { feed, userId, skip, limit } = ctx.query;
  // let { feed } = ctx.query;

  // feed = feed || FEED_TYPE.SOCIETY;

  const searchQuery = {
    societyId
  };

  if (userId && userId !== "") {
    searchQuery["userId"] = userId;
  }

  if (feed === FEED_TYPE.WING) {
    searchQuery["feed"] = FEED_TYPE.WING;
    searchQuery["wingId"] = wingId;
  } else {
    searchQuery["$or"] = [
      { feed: FEED_TYPE.SOCIETY },
      { feed: FEED_TYPE.WING, wingId }
    ];
  }

  const sortFilter = {
    createdOn: -1
  };

  const posts = await findPosts(ctx.db, searchQuery, skip, limit, sortFilter);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Posts fetched successfully!!!",
    totalPosts: posts.length,
    posts
  };
  return;
};

exports.getPost = async (ctx) => {
  const { societyId, wingId } = ctx.request.user;
  const { postId } = ctx.params;

  const post = await findPost(ctx.db, {
    _id: postId,
    societyId
  });

  if (!post) {
    ctx.status = 404;
    ctx.body = { success: false, message: "post not found." };
    return;
  }

  if (post.feed === FEED_TYPE.WING && post.wingId !== wingId) {
    throw new customError("Not allowed.", 403);
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Post fetched successfully!!!",
    post
  };
  return;
};

exports.updatePost = async (ctx) => {
  const { feed, title, text, media, contentType } = ctx.request.body;
  const { societyId, _id, wingId } = ctx.request.user;
  const { postId } = ctx.params;

  const updateQuery = {};
  const postData = { title, text, media, contentType };

  postData["feed"] = FEED_TYPE.SOCIETY;

  if (feed === FEED_TYPE.WING) {
    postData["feed"] = FEED_TYPE.WING;
  }

  if (postData.contentType !== POST_CONTENT_TYPE.TEXT) {
    postData["media"] = postData.media;
    updateQuery.$unset = { text: 1 };
    delete postData.text;
  } else {
    postData["text"] = postData.text;
    updateQuery.$unset = { media: 1 };
    delete postData.media;
  }

  updateQuery.$set = postData;
  console.log("postData before update:", postData, updateQuery);

  const post = await updatePostData(
    ctx.db,
    { _id: postId, userId: _id, societyId, wingId },
    updateQuery
  );

  console.log("post after update:", post);

  if (!post) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Post not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Post details updated successfully!!!",
    post
  };
  return;
};

exports.deletePost = async (ctx) => {
  const { societyId, _id: userId, wingId } = ctx.request.user;
  const { postId: _id } = ctx.params;

  const post = await deletePostData(ctx.db, {
    _id,
    userId,
    societyId,
    wingId
  });

  // const postPromise = deletePostData(ctx.db, {
  //   _id,
  //   userId,
  //   societyId
  // });

  // const [post, _] = await Promise.all([
  //   postPromise,
  //   updateTotalPostCount(
  //     ctx.db,
  //     { _id: userId },
  //     {
  //       $inc: { totalPost: -1 }
  //     }
  //   )
  // ]);

  if (!post) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Post details not found." };
    return;
  }

  await updateTotalPostCount(
    ctx.db,
    { _id: userId },
    {
      $inc: { totalPost: -1 }
    }
  );

  // TODO : delete all the comments on this post
  await deleteComments(ctx.db, { postId: _id });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Post details deleted successfully."
  };
  return;
};
