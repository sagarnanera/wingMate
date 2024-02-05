const generateUUID = require("../utils/generateUUID");

exports.insertBooking = async (
  db,
  { userId, propertyIds, reason, paymentId, requestedDateRange }
) => {
  const BookingCollection = db.collection("bookings");

  const isBooked = await BookingCollection.findOne({
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
          $lt: requestedDateRange.endDate
        }
      },
      {
        endDate: {
          $gt: requestedDateRange.startDate,
          $lte: requestedDateRange.endDate
        }
      }
    ]
  });

  if (isBooked) {
    return null;
  }

  const _id = generateUUID();
  const booking = await BookingCollection.insertOne({
    _id,
    userId,
    propertyIds,
    reason,
    paymentId,
    ...requestedDateRange,
    createdOn: new Date()
  });

  if (booking) {
    return {
      _id,
      userId,
      propertyIds,
      reason,
      paymentId,
      ...requestedDateRange,
      createdOn
    };
  }

  return null;
};

exports.getBookings = async (db, searchQuery) => {
  const BookingCollection = db.collection("bookings");

  const bookings = await BookingCollection.find(searchQuery).toArray();

  return bookings;
};

exports.getBookingById = async (db, { bookingId, userId }) => {
  const BookingCollection = db.collection("bookings");

  const booking = await BookingCollection.findOne({ _id: bookingId, userId });

  return booking;
};
