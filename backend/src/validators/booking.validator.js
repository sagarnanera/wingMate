const joi = require("joi");
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
    .required()
    .validate(propertyIds);

  if (error) {
    return {
      field: "propertyIds",
      message: "PropertyIds should be an array of non-empty strings"
    };
  }

  return null;
};

exports.startDateValidator = (ctx) => {
  const { startDate } = ctx.request.body;

  if (!startDate) {
    return { field: "startDate", message: "Start date is required" };
  }

  const { error } = joi.date().iso().required().validate(startDate);

  if (error) {
    return { field: "startDate", message: "Invalid start date format" };
  }

  //   ctx.request.body.startDate = startDate;

  return null;
};

exports.endDateValidator = (ctx) => {
  const { endDate, startDate } = ctx.request.body;

  if (!endDate) {
    return { field: "endDate", message: "End date is required" };
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

// exports.bookingTypeValidator = (ctx) => {
//   const { bookingType } = ctx.request.body;

//   if (!bookingType) {
//     return {
//       field: "bookingType",
//       message: "Booking type is required."
//     };
//   }

//   const {error} = joi.

//   ctx.request.body.bookingType = bookingType;

//   return null;
// };

exports.eventIdValidator = (ctx) => {
  const { eventId } = ctx.request.body;

  if (!eventId) {
    return { field: "eventId", message: "Event ID is required" };
  }

  if (eventId) {
    const { error } = joi.string().uuid().required().validate(eventId);

    if (error) {
      return { field: "eventId", message: "Event ID must be a valid UUID" };
    }
  }

  //   ctx.request.body.eventId = eventId.trim();

  return null;
};
