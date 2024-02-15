const { Promise } = require("bluebird");
const {
  insertBooking,
  deleteBookingData,
  updateBookingData
} = require("../DB/booking.db");
const {
  updateEvent,
  insertEvent,
  deleteEvent,
  findEvent,
  findEvents,
  updateEventData,
  deleteEventData
} = require("../DB/event.db");
const { insertPost, deletePostData, updatePostData } = require("../DB/post.db");
const { calculatePropertyRent } = require("../DB/property.db");
const { updateTotalPostCount } = require("../DB/user.db");
const {
  EVENT_STATUS,
  BOOKING_TYPE,
  POST_TYPE,
  POST_CONTENT_TYPE,
  FEED_TYPE
} = require("../utils/constants");
const { deleteComments } = require("../DB/comment.db");

exports.createEvent = async (ctx) => {
  const {
    name,
    description,
    feesPerPerson,
    startDate,
    endDate,
    createdOn = new Date(),
    propertyIds
  } = ctx.request.body;
  const { societyId, _id: userId } = ctx.request.user;

  const requestedDateRange = {
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  };

  const eventData = {
    userId,
    societyId,
    name,
    description,
    feesPerPerson,
    propertyIds,
    status: EVENT_STATUS.PENDING,
    ...requestedDateRange,
    createdOn
  };

  const event = await insertEvent(ctx.db, eventData);

  if (!event) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "Unable to add event, try again later!!!"
    };
    return;
  }

  console.log("eventId", event._id);

  const [{ totalAmount }] = await calculatePropertyRent(
    ctx.db,
    propertyIds,
    requestedDateRange
  );

  const bookingData = {
    userId,
    societyId,
    propertyIds,
    reason: "Event",
    eventId: event._id,
    bookingType: BOOKING_TYPE.EVENT,
    totalRent: totalAmount,
    ...requestedDateRange,
    createdOn
  };

  const booking = await insertBooking(ctx.db, bookingData);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event added successfully!!!",
    event,
    booking
  };
  return;
};

exports.getEvents = async (ctx) => {
  const { societyId, _id: userId } = ctx.request.user;

  const events = await findEvents(ctx.db, { societyId, userId });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "events fetched successfully!!!",
    events
  };
  return;
};

exports.getEventsAdmin = async (ctx) => {
  const { societyId } = ctx.request.user;

  const events = await findEvents(ctx.db, { societyId });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "events fetched successfully!!!",
    events
  };
  return;
};

exports.getEvent = async (ctx) => {
  const { societyId } = ctx.request.user;
  const { eventId } = ctx.params;

  const event = await findEvent(ctx.db, {
    _id: eventId,
    societyId
  });

  if (!event) {
    ctx.status = 404;
    ctx.body = { success: false, message: "event not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event fetched successfully!!!",
    event
  };
  return;
};

exports.updateEvent = async (ctx) => {
  const { requestedDateRange, name, description, feesPerPerson } =
    ctx.request.body;
  const { societyId, _id: userId } = ctx.request.user;
  const { eventId } = ctx.params;

  const { propertyIds } = ctx.state?.booking;

  const event = await updateEventData(
    ctx.db,
    { _id: eventId, userId, societyId },
    { ...requestedDateRange, name, description, feesPerPerson }
  );

  console.log("event after update:", event);

  if (!event) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Event not found." };
    return;
  }

  const [{ totalAmount }] = await calculatePropertyRent(
    ctx.db,
    propertyIds,
    requestedDateRange
  );

  await Promise.all([
    updateBookingData(
      ctx.db,
      { eventId, userId },
      { ...requestedDateRange, totalRent: totalAmount }
    ),
    updatePostData(
      ctx.db,
      { eventId, userId, societyId },
      {
        $set: {
          title: name,
          text: description,
          fees: feesPerPerson,
          ...requestedDateRange
        }
      }
    )
  ]);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event & booking details updated successfully!!!",
    event
  };
  return;
};

exports.deleteEvent = async (ctx) => {
  const { societyId, _id: userId } = ctx.request.user;

  const { eventId: _id } = ctx.params;

  const event = await deleteEventData(ctx.db, {
    _id,
    userId,
    societyId
  });

  console.log("event after delete", event);

  if (!event) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Event details not found." };
    return;
  }

  await deleteBookingData(ctx.db, { eventId: _id });

  if (event.status !== EVENT_STATUS.APPROVED) {
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Event & booking details deleted successfully."
    };
    return;
  }

  const post = await deletePostData(ctx.db, {
    eventId: _id,
    societyId,
    userId
  });

  await Promise.all([
    updateTotalPostCount(
      ctx.db,
      { _id: userId },
      {
        $inc: { totalPost: -1 }
      }
    ),
    deleteComments(ctx.db, { postId: post?._id })
  ]);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event & booking details deleted successfully."
  };
  return;
};

// secretory use only
exports.changeEventStatus = async (ctx) => {
  const { status } = ctx.request.body;
  const { societyId } = ctx.request.user;
  const { eventId } = ctx.params;

  const event = await updateEventData(
    ctx.db,
    { _id: eventId, societyId, status: EVENT_STATUS.PENDING },
    { status }
  );

  if (!event) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      message: "Event not found or already approved."
    };
    return;
  }

  if (status === EVENT_STATUS.REJECTED) {
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Event status changed to rejected successfully!!!",
      event
    };
    return;
  }

  const postData = {
    userId: event.userId,
    societyId,
    // wingId: null,
    title: event.name,
    totalLikes: 0,
    totalComments: 0,
    feed: FEED_TYPE.SOCIETY,
    text: event.description,
    postType: POST_TYPE.EVENT_POST,
    eventId,
    fees: event.feesPerPerson,
    contentType: POST_CONTENT_TYPE.TEXT,
    startDate: event.startDate,
    endDate: event.endDate,
    createdOn: new Date()
  };

  const postPromise = insertPost(ctx.db, postData);

  const [post, _] = await Promise.all([
    postPromise,
    updateTotalPostCount(
      ctx.db,
      { _id: event.userId },
      {
        $inc: { totalPost: 1 }
      }
    )
  ]);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event status changed to approved successfully!!!",
    event: { ...event, postId: post._id }
  };
  return;
};
