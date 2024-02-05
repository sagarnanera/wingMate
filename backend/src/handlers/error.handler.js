const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { MongoServerError } = require("mongodb");

// custom error
class customError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}

//  ErrorHandlers
const notFoundHandler = (ctx, next) => {
  ctx.status = 404;
  ctx.body = {
    success: false,
    message: "Not found, Check the URL properly !!!"
  };

  return;
};

const invalidJsonHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      ctx.status = 400;
      ctx.body = { success: false, message: "Invalid JSON payload" };
      return;
    }
    throw err;
  }
};

// global error handler
const ErrorHandler = (err, ctx) => {
  err.expose = true;

  if (err instanceof customError) {
    console.log("custom error", err);

    ctx.status = err.statusCode;
    ctx.body = { success: false, message: err.message };
    return;
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.log("invalid json error", err);
    ctx.status = 400;
    ctx.body = { success: false, message: "Invalid JSON payload" };
    return;
  }

  if (err instanceof MongoServerError) {
    if (err.code === 121) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "mongodb validation error",
        fields: err.errInfo.details.schemaRulesNotSatisfied
      };
      // return;
    }

    if (err.code === 11000) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: `${Object.keys(err.keyPattern)[0]} already exist!!!`
        // err: Object.keys(err.keyPattern)[0]
      };
      // return;
    }

    return;
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    ctx.status = 401;
    ctx.body = { success: false, message: "Invalid or expired token..." };
    return;
  }

  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  console.log("caught in globalErrorHandler :", err, err.code);
  ctx.status = errStatus;
  ctx.body = {
    success: false,
    message: errMsg
  };
  return;
};

module.exports = {
  customError,
  notFoundHandler,
  ErrorHandler,
  invalidJsonHandler
};
