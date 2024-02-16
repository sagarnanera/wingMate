const { Promise } = require("bluebird");
const {
  insertBooking,
  deleteBookingData,
  updateBookingData
} = require("../DB/booking.db");
const {
  insertEvent,
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
const { responseHandler } = require("../handlers/response.handler");

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
    status: EVENT_STATUS.PENDING, // TODO : status should be already approved when secretory add event
    ...requestedDateRange,
    createdOn
  };

  const event = await insertEvent(ctx.db, eventData);

  if (!event) {
    responseHandler(
      ctx,
      false,
      "Unable to add event, try again later!!!",
      400,
      null,
      "error in db while adding event."
    );
    return;
  }

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

  responseHandler(
    ctx,
    true,
    "Event added successfully!!!",
    201,
    { event, booking },
    "event added : "
  );
  return;
};

exports.getEvents = async (ctx) => {
  const { societyId, _id: userId } = ctx.request.user;

  const { skip, limit, eventStatus } = ctx.query;

  const searchQuery = { societyId, userId };

  if (eventStatus) {
    // searchQuery["status"] = eventStatus;

    // can be used as well
    Object.assign(searchQuery, {
      status: eventStatus
    });
  }

  const sortFilter = {
    createdOn: -1
  };

  const events = await findEvents(ctx.db, searchQuery, skip, limit, sortFilter);

  responseHandler(
    ctx,
    true,
    "Events fetched successfully!!!",
    200,
    { totalFetchedEvents: events.length, events },
    "events fetched : "
  );

  return;
};

exports.getEventsAdmin = async (ctx) => {
  const { societyId } = ctx.request.user;
  const { skip, limit, eventStatus } = ctx.query;

  const searchQuery = { societyId };

  const sortFilter = {
    createdOn: -1
  };

  if (eventStatus) {
    Object.assign(searchQuery, {
      status: eventStatus
    });
  }

  const events = await findEvents(ctx.db, searchQuery, skip, limit, sortFilter);

  responseHandler(
    ctx,
    true,
    "Events fetched successfully!!!",
    200,
    { totalFetchedEvents: events.length, events },
    "events fetched by admin : "
  );

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
    responseHandler(
      ctx,
      false,
      "Event not found.",
      404,
      null,
      "event not found at controller."
    );
    return;
  }

  responseHandler(
    ctx,
    true,
    "Event fetched successfully!!!",
    200,
    { event },
    "event fetched : "
  );

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
    responseHandler(
      ctx,
      false,
      "Event not found.",
      404,
      null,
      "event not found in update event."
    );
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

  responseHandler(
    ctx,
    true,
    "Event & booking details updated successfully!!!",
    200,
    { event },
    "event updated : "
  );
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

  if (!event) {
    responseHandler(
      ctx,
      false,
      "Event not found.",
      404,
      null,
      "event not found in deleted event."
    );

    return;
  }

  await deleteBookingData(ctx.db, { eventId: _id });

  if (event.status !== EVENT_STATUS.APPROVED) {
    responseHandler(
      ctx,
      true,
      "Event & booking details deleted successfully!!!",
      200,
      null,
      "event deleted : "
    );

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

  responseHandler(
    ctx,
    true,
    "Event & booking details deleted successfully!!!",
    200,
    null,
    "event deleted : "
  );

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
    responseHandler(
      ctx,
      false,
      "Event not found.",
      404,
      null,
      "event not found in change status :"
    );

    return;
  }

  if (status === EVENT_STATUS.REJECTED) {
    responseHandler(
      ctx,
      true,
      "Event status changed to rejected successfully!!!",
      200,
      { event },
      "event status changed to rejected : "
    );

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

  responseHandler(
    ctx,
    true,
    "Event status changed to approved successfully!!!",
    200,
    { event: { ...event, postId: post._id } },
    "event status changed to approved : "
  );

  return;
};
