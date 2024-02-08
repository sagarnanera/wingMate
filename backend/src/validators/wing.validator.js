const joi = require("joi");

exports.wingIdValidator = (ctx) => {
  const { wingId } = ctx.request.body;

  if (!wingId) {
    return { field: "wingId", message: "WingId is required." };
  }

  const { error } = joi.string().uuid().required().validate(wingId);
  if (error) {
    return { field: "wingId", message: "Wing ID must be a valid UUID" };
  }

  return null;
};
