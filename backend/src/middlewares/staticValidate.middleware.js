const Promise = require("bluebird");
const { validationErrorHandler } = require("../handlers/error.handler");

const staticValidate = (staticValidators) => {
  return async (ctx, next) => {
    const err = await Promise.mapSeries(staticValidators, async (validator) => {
      return await validator(ctx);
    });

    const error = err.filter((e) => e !== null);
    console.log("err in validation : ", error);

    if (error.length > 0) {
      validationErrorHandler(ctx, error);
      return;
    }
    await next();
  };
};

module.exports = staticValidate;
