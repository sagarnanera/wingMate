const {
  PROPERTY_TYPE,
  AUDIENCE_TYPE,
  POST_TYPE
} = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.cretePost = async (ctx) => {
  const PostCollection = ctx.db.collection("posts");
  const { title, postType, visibility, text, mediaURLs } = ctx.request.body;

  const { _id: userId, societyId, wingId } = ctx.request.user;

  const _id = generateUUID();

  //   {
  //     _id,
  //      userId,
  //      title,
  //      postType,
  //      visibility,
  //      text/mediaUrls[],
  //      totalLikes,
  //      totalComments,
  //      recentComments,
  //      totalViews
  // }

  const postData = {};

  if (postType !== POST_TYPE.TEXT && mediaURLs && mediaURLs.length > 0) {
    postData["media"] = mediaURLs;
  } else {
    postData["text"] = text;
  }

  if (visibility === AUDIENCE_TYPE.WING) {
    postData["visibility"] = AUDIENCE_TYPE.WING;
    postData["wingId"] = wingId;
  }

  await PostCollection.insertOne({
    _id,
    userId,
    title,
    visibility,
    postType,
    ...postData
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Post added successfully!!!",
    post: { _id, userId, title, visibility, postType, ...postData }
  };
  return;
};

exports.getPosts = async (ctx) => {
  const PostCollection = ctx.db.collection("posts");

  const { societyId } = ctx.request.user;

  const { wingId } = ctx.query;

  const searchQuery = {};

  if (wingId && wingId !== "") {
    searchQuery["wingId"] = wingId;
  } else {
    searchQuery["societyId"] = societyId;
  }

  const posts = await PostCollection.find(searchQuery).toArray();

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Posts fetched successfully!!!",
    posts
  };
  return;
};

exports.getPost = async (ctx) => {
  const PostCollection = ctx.db.collection("posts");

  const { societyId } = ctx.request.user;
  const { postId } = ctx.params;

  const post = await PostCollection.findOne({
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
  const PostCollection = ctx.db.collection("posts");

  // const { _id } = ctx.request.user;
  const postData = ctx.request.body;
  const { societyId } = ctx.request.user;
  const { postId } = ctx.params;
  console.log("postData before update:", postData);

  const post = await PostCollection.findOneAndUpdate(
    { _id: postId, societyId },
    {
      $set: postData
    },
    { returnDocument: "after" }
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
  const PostCollection = ctx.db.collection("posts");

  const { societyId } = req.request.user;

  const post = await PostCollection.findOneAndDelete({
    _id,
    societyId
  });

  if (!post) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Post details not found." };
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Property details deleted successfully."
  };
  return;
};
