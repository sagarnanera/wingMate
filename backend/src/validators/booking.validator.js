const joi = require("joi");
const { BOOKING_TYPE } = require("../utils/constants");
// {
//   propertyIds,
//     startDate,
//     endDate,
//     reason,
//     bookingType,
//     eventId;
// }

exports.propertyIdsValidator = (ctx) => {
  let { propertyIds } = ctx.request.body;

  if (!propertyIds) {
    return {
      field: "propertyIds",
      message: "PropertyIds is required."
    };
  }

  const { error } = joi
    .array()
    .items(joi.string().uuid().required())
    .unique()
    .required()
    .validate(propertyIds);

  if (error) {
    return {
      field: "propertyIds",
      message: "PropertyIds should be an array of non-empty unique UUIDs."
    };
  }

  return null;
};

exports.startDateValidator = (ctx) => {
  let { startDate } = ctx.request.body;

  if (ctx.request.method === "GET") {
    startDate = ctx.query.startDate;
  }

  if (!startDate) {
    return { field: "startDate", message: "Start date is required" };
  }

  const { error } = joi.date().iso().min("now").required().validate(startDate);

  if (error) {
    return {
      field: "startDate",
      message: "Invalid start date format"
      // err: error
    };
  }

  return null;
};

exports.endDateValidator = (ctx) => {
  let { endDate, startDate } = ctx.request.body;

  if (ctx.request.method === "GET") {
    endDate = ctx.query.endDate;
    startDate = ctx.query.startDate;
  }

  if (!endDate) {
    return { field: "endDate", message: "End date is required" };
  }

  if (joi.date().iso().validate(startDate).error) {
    return null;
  }

  const { error } = joi
    .date()
    .iso()
    .required()
    .min(startDate)
    .validate(endDate);

  if (error) {
    return {
      field: "endDate",
      message: "Invalid end date format or end date must be after start date"
    };
  }

  const requestedDateRange = {
    startDate: new Date(new Date(startDate).setHours(0, 0, 0)),
    endDate: new Date(new Date(endDate).setHours(0, 0, 0))
  };

  ctx.request.body.requestedDateRange = requestedDateRange;

  return null;
};

exports.reasonValidator = (ctx) => {
  let { reason } = ctx.request.body;

  if (!reason || reason === "") {
    return { field: "reason", message: "reason is required" };
  }

  reason = reason.trim();

  const { error } = joi.string().min(10).max(5000).required().validate(reason);

  if (error) {
    return {
      field: "reason",
      message: "Reason should be between 10 and 5000 characters long"
    };
  }

  ctx.request.body.reason = reason;

  return null;
};

exports.bookingTypeValidator = (ctx) => {
  let { bookingType } = ctx.query;
  if (bookingType) {
    bookingType = bookingType.trim();

    console.log(bookingType.length);
    const { error } = joi
      .string()
      .valid(...Object.values(BOOKING_TYPE))
      .required()
      .validate(bookingType);

    if (error) {
      return {
        field: "bookingType",
        message: "Booking type must be one of the [personal, event]."
      };
    }
  }
  ctx.query.bookingType = bookingType;

  return null;
};

exports.bookingIdValidator = (ctx) => {
  const { bookingId } = ctx.params;

  if (!bookingId) {
    return { field: "bookingId", message: "Booking ID is required" };
  }

  if (bookingId) {
    const { error } = joi.string().uuid().required().validate(bookingId);

    if (error) {
      return { field: "bookingId", message: "Booking ID must be a valid UUID" };
    }
  }

  return null;
};
