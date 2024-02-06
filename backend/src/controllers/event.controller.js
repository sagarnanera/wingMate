const {
  updateEvent,
  insertEvent,
  deleteEvent,
  findEvent,
  findEvents,
  updateEventData
} = require("../DB/event.db");
const { EVENT_STATUS } = require("../utils/constants");

exports.createEvent = async (ctx) => {
  const {
    name,
    fees,
    startDate,
    endDate,
    createdOn = new Date()
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
    fees,
    status: EVENT_STATUS.PENDING,
    ...requestedDateRange,
    createdOn
  };

  // await EventCollection.insertOne(eventData);
  const event = await insertEvent(ctx.db, eventData);

  if (!event) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "Unable to add event, try again later!!!"
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event added successfully!!!",
    event
  };
  return;
};

exports.getEvents = async (ctx) => {
  const { societyId } = ctx.request.user;

  // const events = await EventCollection.find(searchQuery).toArray();
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

  // const event = await EventCollection.findOne({
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
  // const { _id } = ctx.request.user;
  const eventData = ctx.request.body;
  const { societyId } = ctx.request.user;
  const { eventId } = ctx.params;
  console.log("eventData before update:", eventData);

  // const event = await EventCollection.findOneAndUpdate(
  const event = await updateEventData(
    ctx.db,
    { _id: eventId, societyId },
    eventData
  );

  console.log("event after update:", event);

  if (!event) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Event not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event details updated successfully!!!",
    event
  };
  return;
};

exports.deleteEvent = async (ctx) => {
  const { societyId } = ctx.request.user;

  // const event = await EventCollection.findOneAndDelete({
  const event = await deleteEvent({
    _id,
    societyId
  });

  if (!event) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Event details not found." };
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event details deleted successfully."
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
    { _id: eventId, societyId },
    { status }
  );

  if (!event) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Event not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event status changed successfully!!!",
    event
  };
  return;
};
