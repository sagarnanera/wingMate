const { isBooked } = require("../DB/booking.db");
const { findComments, findComment } = require("../DB/comment.db");
const { findLike } = require("../DB/like.db");
const { findPost } = require("../DB/post.db");
const { findSociety } = require("../DB/society.db");
const { findUser } = require("../DB/user.db");
const { findWing } = require("../DB/wing.db");
const { customError } = require("../handlers/error.handler");
const { FEED_TYPE } = require("../utils/constants");

exports.isEmailExistValidator = async (ctx) => {
  const { email } = ctx.request.body;

  const result = await findUser(ctx.db, { email });
  if (result) {
    return { message: "User with this email already exist!! " };
  }
  return null;
};

exports.isEmailExistBulkValidator = async (ctx) => {
  const { residents } = ctx.request.body;

  // TODO : validate residents email if it already exist

  // const result = await findUser(ctx.db, { email });

  // if (result) {
  //   return { message: "User with this email already exist!! " };
  // }

  return null;
};

exports.resetLinkValidator = async (ctx) => {
  const { token } = ctx.params;

  const user = await findUser(ctx.db, {
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!user) {
    throw new customError(
      "Password reset-link expired or invalid token!!",
      400
    );
  }

  ctx.request.user = user;
  return null;
};

exports.isUserValidValidator = async (ctx) => {
  const { email } = ctx.request.body;

  const result = await findUser(ctx.db, { email });

  if (!result) {
    throw new customError("User not found.", 404);
  }

  ctx.request.user = result;

  return null;
};

exports.societyExistValidator = async (ctx) => {
  const { societyId, _id } = ctx.request.user;

  const result = await findSociety(ctx.db, {
    _id: societyId,
    secretoryId: _id
  });

  if (!result) {
    throw new customError("Society details not found.", 404);
  }

  ctx.request.society = result;

  return null;
};

exports.wingExistValidator = async (ctx) => {
  const { wingId } = ctx.request.body;
  console.log(ctx.request.user);
  const { societyId } = ctx.request.user;

  if (wingId) {
    const result = await findWing(ctx.db, { _id: wingId, societyId });

    console.log("result", result);

    if (!result) {
      throw new customError("Wing details not found.", 404);
    }
  }

  return null;
};

exports.postExistValidator = async (ctx) => {
  let { postId } = ctx.state;
  const { societyId, wingId } = ctx.request.user;

  console.log("postId,", ctx.state);

  const searchQuery = { societyId, _id: postId };

  // if (
  //   ctx.request.method !== "GET" &&
  //   (ctx.request.url.includes("comment") || ctx.request.url.includes("like"))
  // ) {
  //   searchQuery["wingId"] = wingId;
  // }

  // if (ctx.request.method !== "GET") {
  //   searchQuery["wingId"] = wingId;
  // }

  console.log("query", searchQuery);

  if (postId) {
    const result = await findPost(ctx.db, searchQuery);

    if (!result) {
      throw new customError("Post details not found.", 404);
    }

    if (result.feed === FEED_TYPE.WING && result.wingId !== wingId) {
      throw new customError("Not allowed.", 403);
    }
  }

  return null;
};

exports.commentExistValidator = async (ctx) => {
  let { commentId } = ctx.state;

  if (commentId) {
    const result = await findComment(ctx.db, { _id: commentId });

    if (!result) {
      throw new customError("Comment details not found.", 404);
    }
  }

  return null;
};

exports.isBookedValidator = async (ctx) => {
  const { requestedDateRange } = ctx.request.body;
  const { societyId } = ctx.request.user;

  const booked = await isBooked(
    ctx.db,
    societyId,
    propertyIds,
    requestedDateRange
  );

  console.log("isBooked", booked);

  if (booked) {
    throw new customError(
      "Requested properties are already booked, Please chose other available dates!!!",
      400
    );
  }

  return null;
};

exports.isLikedValidator = async (ctx) => {
  const { _id: userId } = ctx.request.user;
  const { postId } = ctx.params;
  const { commentId } = ctx.request.body;

  const searchQuery = { userId };

  if (commentId) {
    searchQuery["commentId"] = commentId;
  } else {
    searchQuery["postId"] = postId;
  }

  const isLiked = await findLike(ctx.db, searchQuery);

  console.log("isLiked", isLiked, searchQuery);

  ctx.request.body["isLiked"] = isLiked;

  return null;
};
