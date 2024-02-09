const { Promise } = require("bluebird");
const { validationErrorHandler } = require("../handlers/error.handler");

const dbValidate = (dbValidators) => {
  return async (ctx, next) => {
    const err = await Promise.mapSeries(dbValidators, async (validator) => {
      return await validator(ctx);
    });

    const error = err.filter((e) => e !== null);
    console.log("err in db validation : ", error);

    if (error.length > 0) {
      validationErrorHandler(ctx, error);
      return;
    }

    await next();
  };
};

module.exports = dbValidate;
