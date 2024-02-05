const { PROPERTY_TYPE, ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.createBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");
  const PropertyCollection = ctx.db.collection("properties");

  const { _id: userId, societyId } = ctx.request.user;
  const {
    propertyIds,
    startDate,
    endDate,
    paymentId = "xxxxxxx",
    reason
  } = ctx.request.body;

  const requestedDateRange = {
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  };

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
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "Failed to book requested properties, already booked!!!"
    };
    return;
  }

  const aggregationPipeline = [
    {
      $match: {
        _id: { $in: propertyIds }
      }
    },
    {
      $project: {
        _id: 1,
        pricePerDay: 1
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: {
            $multiply: [
              {
                $ceil: {
                  $divide: [
                    {
                      $subtract: [
                        requestedDateRange.endDate,
                        requestedDateRange.startDate
                      ]
                    },
                    24 * 60 * 60 * 1000 // Convert milliseconds to days
                  ]
                }
              },
              "$pricePerDay"
            ]
          }
        }
      }
    }
  ];

  const _id = generateUUID();
  const totalPayableAmount = await PropertyCollection.aggregate(
    aggregationPipeline
  ).toArray();

  console.log("here in create booking", isBooked, _id, totalPayableAmount);

  // TODO: payment gateway : save payment details to payment collection

  const booking = await BookingCollection.insertOne({
    _id,
    userId,
    propertyIds,
    reason,
    paymentId,
    ...requestedDateRange,
    createdOn: new Date()
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Booked properties successfully!!!",
    bookingDetails: {
      _id,
      userId,
      propertyIds,
      reason,
      paymentId,
      ...requestedDateRange,
      createdOn: new Date()
    }
  };
  return;
};

exports.getBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { bookingId } = ctx.params;

  const booking = await BookingCollection.findOne({ _id: bookingId });

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

  const { wingId, societyId, _id } = ctx.request.user;
  const { propertyType } = ctx.query;

  const query = { userId: _id };

  // if (role !== ROLES.SECRETORY) {
  // }

  if (propertyType === PROPERTY_TYPE.SOCIETY) {
    query[propertyType] = societyId;
  } else {
    query[propertyType] = wingId;
  }

  const bookings = await BookingCollection.find(query).toArray();

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Bookings fetched successfully!!!",
    bookings
  };
  return;
};

exports.approveBooking = async (ctx) => {
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
