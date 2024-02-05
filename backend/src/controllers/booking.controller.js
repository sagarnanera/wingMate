const { calculatePropertyRent } = require("../DB/property.db");
const { PROPERTY_TYPE } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.createBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");
  // const PropertyCollection = ctx.db.collection("properties");

  const { _id: userId, societyId } = ctx.request.user;
  const {
    propertyIds,
    startDate,
    endDate,
    paymentId = "xxxxxxx",
    reason,
    createdOn = new Date()
  } = ctx.request.body;

  const requestedDateRange = {
    startDate: new Date(new Date(startDate).setHours(0, 0, 0)),
    endDate: new Date(new Date(endDate).setHours(0, 0, 0))
  };

  const isBooked = await BookingCollection.findOne({
    societyId,
    propertyIds: {
      // $elemMatch: {
      $in: propertyIds
      // }
    },
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
  });

  console.log("isbooked", isBooked);

  if (isBooked) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message:
        "Requested properties are already booked, Please chose other available dates!!!"
    };
    return;
  }

  // // TODO: payment gateway : save payment details to payment collection

  // const booking = await BookingCollection.insertOne({
  //   _id,
  //   userId,
  //   propertyIds,
  //   reason,
  //   paymentId,
  //   ...requestedDateRange,
  //   createdOn: new Date()
  // });

  // const result = await BookingCollection.findOneAndUpdate(
  //   {
  //     societyId,
  //     propertyIds: { $in: propertyIds },
  //     $or: [
  //       {
  //         startDate: { $lt: requestedDateRange.endDate },
  //         endDate: { $gt: requestedDateRange.startDate }
  //       },
  //       {
  //         startDate: {
  //           $gte: requestedDateRange.startDate,
  //           $lte: requestedDateRange.endDate
  //         }
  //       },
  //       {
  //         endDate: {
  //           $gte: requestedDateRange.startDate,
  //           $lte: requestedDateRange.endDate
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     $setOnInsert: {
  //       _id,
  //       userId,
  //       propertyIds,
  //       reason,
  //       paymentId,
  //       ...requestedDateRange,
  //       timestamp: new Date()
  //     }
  //   },
  //   {
  //     upsert: true,
  //     returnDocument: "after" // Return the updated document
  //   }
  // );

  // console.log("booking", result);

  // if (result._id !== _id) {
  //   ctx.status = 400;
  //   ctx.body = {
  //     success: false,
  //     message: "Requested properties are already booked."
  //   };
  //   return;
  // }

  const [{ totalAmount }] = await calculatePropertyRent(
    ctx.db,
    propertyIds,
    requestedDateRange
  );

  const _id = generateUUID();
  const booking = await BookingCollection.insertOne({
    _id,
    userId,
    societyId,
    propertyIds,
    reason,
    totalRent: totalAmount,
    ...requestedDateRange,
    createdOn
  });

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
    bookingDetails: {
      _id,
      userId,
      societyId,
      propertyIds,
      reason,
      totalRent: totalAmount,
      ...requestedDateRange,
      createdOn
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
