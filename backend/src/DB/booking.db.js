const generateUUID = require("../utils/generateUUID");

exports.insertBooking = async (db, bookingData) => {
  const BookingCollection = db.collection("bookings");

  const _id = generateUUID();
  const booking = await BookingCollection.insertOne({ _id, ...bookingData });

  if (booking) {
    return { _id, ...bookingData };
  }

  return null;
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

  // if (result) {
  //   return true;
  // }

  // return false;
  console.log("isbooked res:", result);

  return result;
};

exports.unbookedProperties = async (db, societyId, requestedDateRange) => {
  const PropertyCollection = db.collection("properties");

  console.log("date range in unbooked :", requestedDateRange);

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
    },
    {
      $project: {
        bookings: 0
      }
    }
  ]).toArray();
  console.log(unbookedProperties);

  return unbookedProperties;
};

/**
 *
 * @param {*} db
 * @param {*} searchQuery
 * @param {*} skip
 * @param {*} limit
 * @param {*} sort
 * @returns
 */
exports.findBookings = async (db, searchQuery, skip, limit, sort) => {
  const BookingCollection = db.collection("bookings");

  const bookings = await BookingCollection.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .toArray();

  return bookings;
};

exports.findBooking = async (db, searchQuery) => {
  const BookingCollection = db.collection("bookings");

  const booking = await BookingCollection.findOne(searchQuery);

  return booking;
};

/**
 *
 * @param {*} db
 * @param {*} searchQuery
 * @param {*} dataToUpdate
 * @returns
 */
exports.updateBookingData = async (db, searchQuery, dataToUpdate) => {
  const BookingCollection = db.collection("bookings");

  const booking = await BookingCollection.findOneAndUpdate(
    searchQuery,
    {
      $set: dataToUpdate
    },
    { returnDocument: "after" }
  );

  return booking;
};

/**
 *
 * @param {*} db
 * @param {*} searchQuery
 * @returns
 */
exports.deleteBookingData = async (db, searchQuery) => {
  const BookingCollection = db.collection("bookings");

  const booking = await BookingCollection.findOneAndDelete(searchQuery);

  console.log(booking);

  return booking;
};
