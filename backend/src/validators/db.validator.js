const { findComments, findComment } = require("../DB/comment.db");
const { findPost } = require("../DB/post.db");
const { findSociety } = require("../DB/society.db");
const { findUser } = require("../DB/user.db");
const { findWing } = require("../DB/wing.db");
const { customError } = require("../handlers/error.handler");

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
  const { wingId, societyId } = ctx.request.body;

  const result = await findWing(ctx.db, { _id: wingId, societyId });

  if (!result) {
    throw new customError("Wing details not found.", 404);
  }

  return null;
};

exports.postExistValidator = async (ctx) => {
  let { postId } = ctx.state;
  const { societyId } = ctx.request.user;

  const result = await findPost(ctx.db, { _id: postId, societyId });

  if (!result) {
    throw new customError("Post details not found.", 404);
  }

  return null;
};

exports.commentExistValidator = async (ctx) => {
  let { commentId, postId } = ctx.state;

  if (commentId) {
    const result = await findComment(ctx.db, { _id: commentId, postId });

    if (!result) {
      throw new customError("Comment details not found.", 404);
    }
  }

  return null;
};

exports.isBookedValidator = async (ctx) => {
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
