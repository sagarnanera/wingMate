const joi = require("joi");
const { EVENT_STATUS } = require("../utils/constants");

// {
//   name,
//   fees,
///   ...requestedDateRange,
// }

//  {
//   propertyIds,
//   ...requestedDateRange,
// }

exports.feesPerPersonValidator = (ctx) => {
  let { feesPerPerson } = ctx.request.body;

  if (!feesPerPerson) {
    return {
      field: "feesPerPerson",
      message: "feesPerPerson is required"
    };
  }

  const { error } = joi
    .number()
    .positive()
    .min(1)
    .required()
    .validate(feesPerPerson);

  if (error) {
    return {
      field: "feesPerPerson",
      message: "FeesPerPerson should be a positive number."
    };
  }

  return null;
};

exports.eventDescriptionValidator = (ctx) => {
  let { description } = ctx.request.body;

  if (!description) {
    return {
      field: "description",
      message: "description is required"
    };
  }

  const { error } = joi
    .string()
    .min(10)
    .max(5000)
    .required()
    .validate(description);

  if (error) {
    return {
      field: "description",
      message: "Description should be between 10 and 5000 characters long."
    };
  }

  return null;
};

exports.eventIdValidator = (ctx) => {
  const { eventId } = ctx.params;

  if (!eventId) {
    return { field: "eventId", message: "Event ID is required" };
  }

  if (eventId) {
    const { error } = joi.string().uuid().required().validate(eventId);

    if (error) {
      return { field: "eventId", message: "Event ID must be a valid UUID" };
    }
  }

  return null;
};

exports.eventStatusValidator = (ctx) => {
  const { status } = ctx.request.body;

  if (!status) {
    return { field: "status", message: "status is required" };
  }

  if (status) {
    const { error } = joi
      .string()
      .valid(...Object.values(EVENT_STATUS))
      .required()
      .validate(status);

    if (error) {
      return {
        field: "status",
        message: "status must be one of the [approved, rejected]"
      };
    }
  }

  return null;
};
