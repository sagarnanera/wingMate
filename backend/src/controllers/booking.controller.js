const { PROPERTY_TYPE } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.createBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { userId } = ctx.request.user;

  const bookingData = ctx.request.body;

  const _id = generateUUID();

  // {
  //     _id,
  //      userId,
  //      propertiesId[],
  //      paymentId,
  //      eventId,
  //      startDate,
  //      endDate,
  //      timestamp
  // }

  const booking = await BookingCollection.insertOne({
    _id,
    userId,
    ...bookingData
  });

  ctx.status = 200;

  ctx.body = {
    success: true,
    message: "Booked properties successfully!!!",
    booking
  };
  return;
};

exports.getBooking = async (ctx) => {
  const BookingCollection = ctx.db.collection("bookings");

  const { bookingId } = ctx.params;

  const booking = await BookingCollection.find({ _id: bookingId });

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

  const { wingId, societyId, propertyType } = ctx.request.user;

  const query = {};

  if (propertyType === PROPERTY_TYPE.SOCIETY) {
    query[propertyType] = societyId;
  } else {
    query[propertyType] = wingId;
  }

  const bookings = await BookingCollection.find(query);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Bookings fetched successfully!!!",
    bookings
  };
  return;
};

exports.verifyBooking = async (ctx) => {
  //   const id = req.user;
  //   const { error } = userIdObjectValidator.validate(req.body);
  //   if (error) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: error.details[0].message });
  //   }
  const { _id } = ctx.request.body;

  const UserCollection = ctx.db.collection("users");

  const user = await UserCollection.findOneAndUpdate(
    _id,
    {
      isVerified: true,
      verifiedBy: id._id
    },
    { returnDocument: "After" }
  );
  //   .select("userName isVerified verifiedBy email isEmailVerified ");

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "User verified successfully!!!",
    user
  };
  return;
};

exports.updateBooking = async (ctx) => {
  //   const { error } = userValidator.validate(req.body);
  //   if (error) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: error.details[0].message });
  //   }
  const { _id } = ctx.request.user;
  const { email, password, ...restUserData } = ctx.request.body;

  const UserCollection = ctx.db.collection("users");

  let dataToUpdate = {};

  if (password) {
    dataToUpdate["password"] = await hashPassword(password);
  }

  if (email) {
    dataToUpdate["email"] = email;
  }

  dataToUpdate = { ...dataToUpdate, ...restUserData };
  console.log("user in update:", dataToUpdate);

  const user = await UserCollection.findOneAndUpdate(
    { _id },
    {
      $set: {
        ...dataToUpdate
      }
    },
    { returnDocument: "after", projection: { password: 0 } }
  );
  // .select("userName email isEmailVerified");
  console.log("user in update:", user);

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "User updated successfully!!!", user };
  return;
};

exports.deleteBooking = async (ctx) => {
  const UserCollection = ctx.db.collection("users");
  const { _id } = ctx.request.user;

  const user = await UserCollection.findOneAndDelete({ _id });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "User deleted successfully." };
  return;
};
