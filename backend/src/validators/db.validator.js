const { isBooked, findBooking } = require("../DB/booking.db");
const { findComments, findComment } = require("../DB/comment.db");
const { findEvent } = require("../DB/event.db");
const { findLike } = require("../DB/like.db");
const { findPost } = require("../DB/post.db");
const { findProperties } = require("../DB/property.db");
const { findSociety } = require("../DB/society.db");
const { findUser } = require("../DB/user.db");
const { findWing } = require("../DB/wing.db");
const { customError } = require("../handlers/error.handler");
const { FEED_TYPE, BOOKING_TYPE } = require("../utils/constants");

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
  const { societyId } = ctx.request.user;

  const result = await findSociety(ctx.db, {
    _id: societyId
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
  let { propertyIds } = ctx.request.body;
  const { societyId } = ctx.request.user;

  if (ctx.request.method === "PUT") {
    console.log("here in if");
    const { startDate, endDate } = ctx.state?.booking;
    propertyIds = ctx.state?.booking?.propertyIds;

    console.log(startDate, endDate, requestedDateRange);
    if (
      new Date(requestedDateRange.startDate).getTime() ===
        new Date(startDate).getTime() &&
      new Date(requestedDateRange.endDate).getTime() ===
        new Date(endDate).getTime()
    ) {
      throw new customError(
        "Provide different dates from previously booked dates!!!",
        400
      );
    }
  }

  const booked = await isBooked(
    ctx.db,
    societyId,
    propertyIds,
    requestedDateRange
  );

  if (booked) {
    throw new customError(
      "Requested properties are already booked, Please chose other available dates!!!",
      400
    );
  }

  return null;
};

exports.isBookingExistValidator = async (ctx) => {
  const { _id: userId } = ctx.request.user;

  const { bookingId } = ctx.params;

  const booking = await findBooking(ctx.db, { _id: bookingId, userId });

  if (!booking) {
    throw new customError("Booking details not found!!!", 400);
  }

  if (booking.bookingType === BOOKING_TYPE.EVENT) {
    throw new customError("can't update event bookings!!!", 403);
  }

  ctx.state.booking = booking;

  return null;
};

exports.isEventExistValidator = async (ctx) => {
  const { _id: userId } = ctx.request.user;

  const { eventId } = ctx.params;

  const event = await findEvent(ctx.db, { _id: eventId, userId });

  // const booking = await findBooking(ctx.db, { eventId, userId });

  if (!event) {
    throw new customError("Event details not found!!!", 400);
  }

  ctx.state.booking = event;

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

exports.propertiesExistValidator = async (ctx) => {
  let { propertyIds } = ctx.request.body;
  const { societyId, wingId } = ctx.request.user;

  const searchQuery = { societyId, _id: { $in: propertyIds } };

  // console.log("query", searchQuery);

  if (propertyIds) {
    const results = await findProperties(ctx.db, searchQuery);

    if (!results || results.length !== propertyIds.length) {
      throw new customError("Properties details not found.", 404);
    }

    // Check if the properties belong to the user's wing (if applicable)
    // for (const result of results) {
    //   if (result.wingId && result.wingId !== wingId) {
    //     throw new customError(`Property ${result.name} doesn't belong to your wing.`, 403);
    //   }
    // }
  }

  return null;
};
