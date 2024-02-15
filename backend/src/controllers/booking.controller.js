const {
  unbookedProperties,
  insertBooking,
  findBooking,
  findBookings,
  updateBookingData,
  deleteBookingData
} = require("../DB/booking.db");
const { updateEventData } = require("../DB/event.db");
const { calculatePropertyRent } = require("../DB/property.db");
const { BOOKING_TYPE } = require("../utils/constants");

exports.createBooking = async (ctx) => {
  const { _id: userId, societyId } = ctx.request.user;
  const {
    propertyIds,
    requestedDateRange,
    reason,
    createdOn = new Date()
  } = ctx.request.body;

  const [{ totalAmount }] = await calculatePropertyRent(
    ctx.db,
    propertyIds,
    requestedDateRange
  );

  const bookingData = {
    userId,
    societyId,
    propertyIds,
    reason,
    bookingType: BOOKING_TYPE.PERSONAL,
    totalRent: totalAmount,
    ...requestedDateRange,
    createdOn
  };

  console.log("booking data in ctrl:", bookingData);

  const booking = await insertBooking(ctx.db, bookingData);

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
    bookingDetails: booking
  };
  return;
};

exports.getBooking = async (ctx) => {
  const { _id: userId } = ctx.request.user;
  const { bookingId } = ctx.params;

  const booking = await findBooking(ctx.db, { _id: bookingId, userId });

  console.log("booking ,", bookingId, booking, userId);

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

  // const bookings = await BookingCollection.find(query).toArray();
  const bookings = await findBookings(ctx.db, query);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Bookings fetched successfully!!!",
    bookings
  };
  return;
};

exports.updateBooking = async (ctx) => {
  const { _id: userId } = ctx.request.user;
  const { requestedDateRange } = ctx.request.body;
  const { bookingId: _id } = ctx.params;
  const { propertyIds } = ctx.state?.booking;

  const [{ totalAmount }] = await calculatePropertyRent(
    ctx.db,
    propertyIds,
    requestedDateRange
  );

  const booking = await updateBookingData(
    ctx.db,
    { _id, userId, bookingType: BOOKING_TYPE.PERSONAL },
    { ...requestedDateRange, totalRent: totalAmount }
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
  const { bookingId: _id } = ctx.params;
  const { _id: userId } = ctx.request.user;

  console.log("booking in delete:", _id, userId);
  const booking = await deleteBookingData(ctx.db, {
    _id,
    userId,
    bookingType: BOOKING_TYPE.PERSONAL
  });

  if (!booking) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      message:
        "Booking details not found or booking is event booking which can't be deleted directly."
    };
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
