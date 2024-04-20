const joi = require("joi");
const { verifyJWTToken } = require("../services/jwt.service");

exports.locationValidator = (ctx) => {
  let { location } = ctx.request.body;

  if (!location || location === "") {
    return { field: "location", message: "Location is required" };
  }
  location = location.trim();
  const { error } = joi.string().min(5).max(100).required().validate(location);
  if (error) {
    return {
      field: "location",
      message: "Location should be between 5 and 30 characters long"
    };
  }

  ctx.request.body.location = location;

  return null;
};
exports.societyNameValidator = (ctx) => {
  let { societyName } = ctx.request.body;

  if (!societyName || societyName === "") {
    return { field: "societyName", message: "societyName is required" };
  }

  societyName = societyName.trim();

  const { error } = joi
    .string()
    .min(3)
    .max(50)
    .required()
    .validate(societyName);
  if (error) {
    return {
      field: "societyName",
      message: "Society name should be between 3 and 50 characters long"
    };
  }
  ctx.request.body.societyName = societyName;
  return null;
};

exports.areaValidator = (ctx) => {
  const { area } = ctx.request.body;

  if (!area) {
    return { field: "area", message: "area is required" };
  }

  console.log("area in validate", area, typeof area);

  // TODO : change to accept numbers only

  const { error } = joi.number().positive().min(1).required().validate(area);

  if (error) {
    return { field: "area", message: "Area should be a positive number." };
  }

  return null;
};

exports.societyIdValidator = (ctx) => {
  const { societyId } = ctx.params;

  if (!societyId) {
    return { field: "societyId", message: "societyId is required" };
  }

  const { error } = joi.string().uuid().required().validate(societyId);
  if (error) {
    return { field: "societyId", message: "Society ID must be a valid UUID" };
  }

  return null;
};

exports.residentsValidator = (ctx) => {
  const { residents } = ctx.request.body;

  if (!Array.isArray(residents) || residents.length === 0) {
    return { field: "residents", message: "residents is required." };
  }

  const { error } = joi
    .array()
    .items(joi.string().email().required())
    .required()
    .validate(residents);

  if (error) {
    return {
      field: "residents",
      message: "Residents must be an array of valid email addresses."
    };
  }

  return null;
};

exports.invitationTokenValidator = (ctx) => {
  const { invitationToken } = ctx.query;

  if (!invitationToken || invitationToken === "") {
    return {
      field: "invitationToken",
      message: "invitationToken is required."
    };
  }

  const { _id, societyId } = verifyJWTToken(invitationToken);

  ctx.request.body._id = _id;
  ctx.request.body.societyId = societyId;
  ctx.request.user = { societyId };

  return null;
};

// exports.societyRegistrationValidator = joi.object({
//   user: joi.object({
//     name: joi.string().min(3).max(20).required(),
//     email: joi.string().email().required(),
//     password: joi.string().required(),
//     contact: joi.string().pattern().required()
//   }),
//   society: joi.object({
//     societyName: joi.string().min(3).max(20).required(),
//     location: joi.string().min(5).max(20).required(),
//     area: joi.number().min(0)
//   })
// });

// exports.updateSocietyValidator = joi.object({
//   societyName: joi.string().min(3).max(20).required(),
//   location: joi.string().min(5).max(20).required(),
//   area: joi.number().min(0)
// });
