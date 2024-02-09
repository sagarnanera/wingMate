const {
  insertPost,
  findPost,
  findPosts,
  updatePostData,
  deletePostData
} = require("../DB/post.db");
const { updateTotalPostCount } = require("../DB/user.db");
const {
  POST_TYPE,
  POST_CONTENT_TYPE,
  FEED_TYPE
} = require("../utils/constants");
const { Promise } = require("bluebird");

exports.createPost = async (ctx) => {
  const { title, text, media, contentType, feed } = ctx.request.body;
  const { _id: userId, societyId, wingId } = ctx.request.user;

  const postData = {
    userId,
    societyId,
    title,
    // text,
    // media,
    postType: POST_TYPE.NORMAL_POST,
    contentType,
    createdOn: new Date()
  };

  if (feed === FEED_TYPE.WING) {
    postData["wingId"] = wingId;
  }

  if (contentType !== POST_CONTENT_TYPE.TEXT) {
    postData["media"] = media;
  } else {
    postData["text"] = text;
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
  const searchQuery = {};

  if (userId && userId !== "") {
    searchQuery["userId"] = userId;
  }

  if (feed === FEED_TYPE.WING) {
    searchQuery["wingId"] = wingId;
  } else {
    searchQuery["societyId"] = societyId;
    searchQuery["wingId"] = null;
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
  const { societyId } = ctx.request.user;
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

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Post fetched successfully!!!",
    post
  };
  return;
};

exports.updatePost = async (ctx) => {
  const { feed, ...postData } = ctx.request.body;
  const { societyId, _id, wingId } = ctx.request.user;
  const { postId } = ctx.params;

  console.log("postData before update:", postData);

  if (feed) {
    if (feed === FEED_TYPE.WING) {
      postData["wingId"] = wingId;
    }

    if (feed === FEED_TYPE.SOCIETY) {
      postData["wingId"] = null;
    }
  }

  if (postData.contentType !== POST_CONTENT_TYPE.TEXT) {
    postData["media"] = postData.media;
    postData["text"] = null;
  } else {
    postData["text"] = postData.text;
    postData["media"] = null;
  }

  const post = await updatePostData(
    ctx.db,
    { _id: postId, userId: _id, societyId },
    postData
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
  const { societyId, _id: userId } = ctx.request.user;
  const { postId: _id } = ctx.params;

  const post = await deletePostData(ctx.db, {
    _id,
    userId,
    societyId
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

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Post details deleted successfully."
  };
  return;
};
