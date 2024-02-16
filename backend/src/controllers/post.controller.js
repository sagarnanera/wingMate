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
const { responseHandler } = require("../handlers/response.handler");
const {
  postToFacebook,
  deleteFacebookPost
} = require("../services/facebook.service");
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

  const fbPostUrl = `https://facebook.com/${postData.fbPostId}`;

  responseHandler(
    ctx,
    true,
    "Post added successfully!!!",
    201,
    {
      post: { ...post, fbPostUrl }
    },
    "post added :"
  );

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

  posts.forEach((post) => {
    if (post.fbPostId) {
      post["fbPostURL"] = `https://facebook.com/${post.fbPostId}`;
    }
  });

  responseHandler(
    ctx,
    true,
    "Posts fetched successfully!!!",
    200,
    {
      totalPosts: posts.length,
      posts
    },
    "posts fetched :"
  );
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
    responseHandler(
      ctx,
      false,
      "Post not found.",
      404,
      null,
      "post not found."
    );
    return;
  }

  if (post.feed === FEED_TYPE.WING && post.wingId !== wingId) {
    throw new customError("Not allowed.", 403);
  }

  post["fbPostURL"] = `https://facebook.com/${post.fbPostId}`;

  responseHandler(
    ctx,
    true,
    "Post fetched successfully!!!",
    200,
    {
      post
    },
    "post fetched :"
  );
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

  const post = await updatePostData(
    ctx.db,
    { _id: postId, userId: _id, societyId, wingId },
    updateQuery
  );

  if (!post) {
    responseHandler(
      ctx,
      false,
      "Post not found.",
      404,
      null,
      "post not found in update post."
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "Post details updated successfully!!!",
    200,
    {
      post
    },
    "post updated :"
  );

  return;
};

exports.deletePost = async (ctx) => {
  const { societyId, _id: userId } = ctx.request.user;
  const { postId: _id } = ctx.params;

  const post = await deletePostData(ctx.db, {
    _id,
    userId,
    societyId,
    postType: POST_TYPE.NORMAL_POST
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
    responseHandler(
      ctx,
      false,
      "Post not found.",
      404,
      null,
      "post not found in delete post."
    );

    return;
  }

  const promiseArr = [
    updateTotalPostCount(
      ctx.db,
      { _id: userId },
      {
        $inc: { totalPost: -1 }
      }
    ),
    deleteComments(ctx.db, { postId: _id })
  ];

  if (post?.fbPostId) {
    promiseArr.push(deleteFacebookPost(post?.fbPostId));
  }

  Promise.all(promiseArr);
  responseHandler(
    ctx,
    true,
    "Post details deleted successfully.",
    200,
    null,
    "post deleted."
  );
  return;
};
