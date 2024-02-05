const { EVENT_STATUS } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.createEvent = async (ctx) => {
  const EventCollection = ctx.db.collection("events");
  const BookingCollection = ctx.db.collection("bookings");

  const { name, fees, startDate, endDate, propertyIds } = ctx.request.body;
  const { societyId, _id: userId } = ctx.request.user;
  const bookingId = generateUUID();
  const _id = generateUUID();

  //   {
  //     _id,
  //      userId,
  //      name,
  //      paymentId, // TODO : remove
  //      fees,
  //      bookingId, // TODO : remove
  //      status,
  //      societyId,
  //      startDate,
  //      endDate
  // }

  const requestedDateRange = {
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  };

  const isBooked = await BookingCollection.findOne(
    {
      societyId,
      propertyIds: { $in: propertyIds },
      $or: [
        {
          startDate: { $lt: requestedDateRange.endDate },
          endDate: { $gt: requestedDateRange.startDate }
        },
        {
          startDate: {
            $gte: requestedDateRange.startDate,
            $lte: requestedDateRange.endDate
          }
        },
        {
          endDate: {
            $gte: requestedDateRange.startDate,
            $lte: requestedDateRange.endDate
          }
        }
      ]
    }
    // {
    //   $set: {
    //     _id: bookingId,
    //     userId,
    //     propertyIds,
    //     eventId: _id,
    //     ...requestedDateRange,
    //     timestamp: new Date()
    //   }
    // },
    // {
    //   upsert: true,
    //   returnDocument: "after"
    // }
  );

  if (isBooked) {
    ctx.status = 400;
    ctx.body ==
      {
        success: false,
        message:
          "Requested properties are already booked in given time frame!!!"
      };
    return;
  }

  const event = await EventCollection.insertOne({
    _id,
    userId,
    societyId,
    name,
    fees,
    status: EVENT_STATUS.PENDING,
    startDate,
    endDate,
    createdOn: new Date()
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Event added successfully!!!",
    event
  };
  return;
};

exports.getEvents = async (ctx) => {
  const EventCollection = ctx.db.collection("events");

  const { societyId } = ctx.request.user;

  const { wingId } = ctx.query;

  const searchQuery = {};

  if (wingId && wingId !== "") {
    searchQuery["wingId"] = wingId;
  } else {
    searchQuery["societyId"] = societyId;
  }

  const events = await EventCollection.find(searchQuery).toArray();

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "events fetched successfully!!!",
    events
  };
  return;
};

exports.getEvent = async (ctx) => {
  const EventCollection = ctx.db.collection("events");

  const { societyId } = ctx.request.user;
  const { eventId } = ctx.params;

  const event = await EventCollection.findOne({
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
  const EventCollection = ctx.db.collection("events");

  // const { _id } = ctx.request.user;
  const eventData = ctx.request.body;
  const { societyId } = ctx.request.user;
  const { eventId } = ctx.params;
  console.log("eventData before update:", eventData);

  const event = await EventCollection.findOneAndUpdate(
    { _id: eventId, societyId },
    {
      $set: eventData
    },
    { returnDocument: "after" }
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
  const EventCollection = ctx.db.collection("events");

  const { societyId } = req.request.user;

  const event = await EventCollection.findOneAndDelete({
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
