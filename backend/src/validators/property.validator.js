const joi = require("joi");

exports.rentValidator = (ctx) => {
  let { rentPerDay } = ctx.request.body;

  if (!rentPerDay) {
    return { field: "rentPerDay", message: "rentPerDay is required" };
  }

  const { error } = joi
    .number()
    .positive()
    .min(1)
    .required()
    .validate(rentPerDay);

  if (error) {
    return {
      field: "rentPerDay",
      message: "RentPerDay should be a positive number."
    };
  }

  return null;
};

exports.propertyIdValidator = (ctx) => {
  const { propertyId } = ctx.params;

  if (!propertyId) {
    return { field: "propertyId", message: "Event ID is required" };
  }

  if (propertyId) {
    const { error } = joi.string().uuid().required().validate(propertyId);

    if (error) {
      return {
        field: "propertyId",
        message: "Property ID must be a valid UUID"
      };
    }
  }

  //   ctx.request.body.propertyId = propertyId.trim();

  return null;
};
