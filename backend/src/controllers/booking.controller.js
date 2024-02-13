const {
  isBooked,
  getUnbookedProperties,
  unbookedProperties
} = require("../DB/booking.db");
const { getEvent } = require("../DB/event.db");
const { calculatePropertyRent } = require("../DB/property.db");
const { PROPERTY_TYPE, BOOKING_TYPE, ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.createBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { _id: userId, societyId } = ctx.request.user;
  const {
    propertyIds,
    requestedDateRange,
    reason,
    createdOn = new Date()
    // bookingType,
    // eventId
  } = ctx.request.body;

  // checking availability for the requested properties
  // const requestedDateRange = {
  //   startDate: new Date(new Date(startDate).setHours(0, 0, 0)),
  //   endDate: new Date(new Date(endDate).setHours(0, 0, 0))
  // };

  // const booked = await isBooked(
  //   ctx.db,
  //   societyId,
  //   propertyIds,
  //   requestedDateRange
  // );

  // console.log("isBooked", booked);

  // if (booked) {
  //   ctx.status = 400;
  //   ctx.body = {
  //     success: false,
  //     message:
  //       "Requested properties are already booked, Please chose other available dates!!!"
  //   };
  //   return;
  // }

  // actual booking starts from here
  const [{ totalAmount }] = await calculatePropertyRent(
    ctx.db,
    propertyIds,
    requestedDateRange
  );

  const _id = generateUUID();
  const bookingData = {
    _id,
    userId,
    societyId,
    propertyIds,
    reason,
    bookingType: BOOKING_TYPE.PERSONAL,
    totalRent: totalAmount,
    ...requestedDateRange,
    createdOn
  };

  // if (bookingType === BOOKING_TYPE.EVENT) {
  //   const isValid = await getEvent(ctx.db, {
  //     _id: eventId,
  //     startDate: requestedDateRange.startDate,
  //     endDate: requestedDateRange.endDate
  //   });
  //   if (!isValid) {
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //       message: "Event not found!!!"
  //     };
  //     return;
  //   }

  //   bookingData["eventId"] = eventId;
  //   bookingData["bookingType"] = BOOKING_TYPE.EVENT;
  // }

  const booking = await BookingCollection.insertOne(bookingData);

  if (!booking) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message:
        "Unable to book the requested properties, Please try again later!!!"
    };
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Booked properties successfully!!!",
    bookingDetails: bookingData
  };
  return;
};

exports.getBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { _id: userId } = ctx.request.user;
  const { bookingId } = ctx.params;

  const booking = await BookingCollection.findOne({ _id: bookingId, userId });

  if (!booking) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Booking details not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Booking details fetched successfully!!!",
    booking
  };
  return;
};

exports.getBookings = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { wingId, societyId, _id, role } = ctx.request.user;
  const { propertyType, bookingType } = ctx.query;

  const query = { userId: _id, societyId };

  // if (role !== ROLES.SECRETORY) {
  //   query["userId"] = _id;
  // }

  // if (role !== ROLES.SECRETORY) {
  // }

  // if (propertyType && propertyType === PROPERTY_TYPE.WING) {
  //   query["propertyType"] = wingId;
  // }

  // if (bookingType && bookingType === BOOKING_TYPE.EVENT) {
  //   query["bookingType"] = BOOKING_TYPE.EVENT;
  // }
  // if (bookingType && bookingType === BOOKING_TYPE.PERSONAL) {
  //   query["bookingType"] = BOOKING_TYPE.PERSONAL;
  // }

  const bookings = await BookingCollection.find(query).toArray();

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Bookings fetched successfully!!!",
    bookings
  };
  return;
};

exports.updateBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { _id: userId } = ctx.request.user;
  const { _id, ...restBookingData } = ctx.request.body;

  console.log("booking before update:", restBookingData);

  const booking = await BookingCollection.findOneAndUpdate(
    { _id, userId },
    {
      $set: restBookingData
    },
    { returnDocument: "after" }
  );

  console.log("booking after update:", booking);

  if (!booking) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Booking details not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Booking details updated successfully!!!",
    booking
  };
  return;
};

exports.deleteBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");
  const { bookingId: _id } = ctx.params;
  const { _id: userId } = ctx.request.user;

  console.log("booking in delete:", _id, userId);
  const booking = await BookingCollection.findOneAndDelete({ _id, userId });

  if (!booking) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Booking details not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Booking details deleted successfully."
  };
  return;
};

exports.getUnbookedProperties = async (ctx) => {
  const { societyId } = ctx.request.user;

  const { startDate, endDate } = ctx.query;

  const requestedDateRange = {
    startDate: new Date(new Date(startDate).setHours(0, 0, 0)),
    endDate: new Date(new Date(endDate).setHours(0, 0, 0))
  };
  const availableProperties = await unbookedProperties(
    ctx.db,
    societyId,
    requestedDateRange
  );

  ctx.status = 200;
  ctx.body = {
    success: true,
    message:
      "Available properties for the given time frame fetched successfully!!!",
    availableProperties
  };
  return;
};

// only for personal booking
exports.changeBookingStatus = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { _id } = ctx.request.body;
  const { _id: userId } = ctx.request.user;

  const booking = await BookingCollection.findOneAndUpdate(
    { _id },
    {
      isApproved: true,
      verifiedBy: userId
    },
    { returnDocument: "after" }
  );

  if (!booking) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Booking details not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Booking approved successfully!!!",
    booking
  };
  return;
};
