const { BOOKING_TYPE } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");
const { getEvent } = require("./event.db");

exports.insertBooking = async (
  db,
  { userId, propertyIds, reason, bookingType, requestedDateRange }
) => {
  const BookingCollection = db.collection("bookings");

  // const isBooked = await BookingCollection.findOne({
  //   societyId,
  //   propertyIds: { $in: propertyIds },
  //   $or: [
  //     {
  //       startDate: { $lt: requestedDateRange.endDate },
  //       endDate: { $gt: requestedDateRange.startDate }
  //     },
  //     {
  //       startDate: {
  //         $gte: requestedDateRange.startDate,
  //         $lt: requestedDateRange.endDate
  //       }
  //     },
  //     {
  //       endDate: {
  //         $gt: requestedDateRange.startDate,
  //         $lte: requestedDateRange.endDate
  //       }
  //     }
  //   ]
  // });

  // if (isBooked) {
  //   return null;
  // }

  const booked = await this.isBooked(db, propertyIds, requestedDateRange);

  if (booked) {
    return null;
  }

  const _id = generateUUID();
  // const booking = await BookingCollection.insertOne({
  //   _id,
  //   userId,
  //   propertyIds,
  //   reason,
  //   paymentId,
  //   ...requestedDateRange,
  //   createdOn: new Date()
  // });

  // if (booking) {
  //   return {
  //     _id,
  //     userId,
  //     propertyIds,
  //     reason,
  //     paymentId,
  //     ...requestedDateRange,
  //     createdOn
  //   };
  // }

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

  if (bookingType === BOOKING_TYPE.EVENT) {
    const isValid = await getEvent(ctx.db, { _id: eventId });
    if (!isValid) {
      return { message: "Event not found!!!" };
    }

    bookingData["eventId"] = eventId;
    bookingData["bookingType"] = BOOKING_TYPE.EVENT;
  }

  const booking = await BookingCollection.insertOne(bookingData);

  if (!booking) {
    // ctx.status = 400;
    // ctx.body = {
    //   success: false,
    //   message:
    //     "Unable to book the requested properties, Please try again later!!!"
    // };

    return null;
  }

  return bookingData;
};

exports.isBooked = async (db, societyId, propertyIds, requestedDateRange) => {
  const BookingCollection = db.collection("bookings");

  const result = await BookingCollection.findOne({
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

  if (result) {
    return true;
  }

  return false;
};

exports.unbookedProperties = async (db, societyId, requestedDateRange) => {
  const PropertyCollection = db.collection("properties");

  // const result = await BookingCollection.findOne({
  //   societyId,
  //   propertyIds: { $in: propertyIds },
  //   $nor: [
  //     {
  //       startDate: { $lt: requestedDateRange.endDate },
  //       endDate: { $gt: requestedDateRange.startDate }
  //     },
  //     {
  //       startDate: {
  //         $gte: requestedDateRange.startDate,
  //         $lt: requestedDateRange.endDate
  //       }
  //     },
  //     {
  //       endDate: {
  //         $gt: requestedDateRange.startDate,
  //         $lte: requestedDateRange.endDate
  //       }
  //     }
  //   ]
  // });

  const unbookedProperties = await PropertyCollection.aggregate([
    {
      $match: { societyId }
    },
    {
      $lookup: {
        from: "bookings",
        let: { propertyIds: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$$propertyIds", "$propertyIds"] },
                  {
                    $or: [
                      {
                        $and: [
                          { $lte: ["$startDate", requestedDateRange.endDate] },
                          { $gte: ["$endDate", requestedDateRange.startDate] }
                        ]
                      },
                      {
                        $and: [
                          {
                            $gte: ["$startDate", requestedDateRange.startDate]
                          },
                          { $lte: ["$startDate", requestedDateRange.endDate] }
                        ]
                      },
                      {
                        $and: [
                          { $gte: ["$endDate", requestedDateRange.startDate] },
                          { $lte: ["$endDate", requestedDateRange.endDate] }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          }
        ],
        as: "bookings"
      }
    },
    {
      $match: {
        bookings: { $eq: [] }
      }
    }
  ]).toArray();
  console.log(unbookedProperties);

  return unbookedProperties;
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
