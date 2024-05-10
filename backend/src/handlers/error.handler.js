const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { MongoServerError } = require("mongodb");
const { responseHandler } = require("./response.handler");

// custom error
class customError extends Error {
  constructor(message, statusCode, errData) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errData = errData;
  }
}

//  ErrorHandlers
const notFoundHandler = (ctx, next) => {
  responseHandler(
    ctx,
    false,
    "Not found, Check the URL properly !!!",
    404,
    null,
    ""
  );

  return;
};

const validationErrorHandler = (ctx, err) => {
  responseHandler(
    ctx,
    false,
    "validation error!!!",
    400,
    { err },
    "validation err:"
  );

  return;
};

// const dbValidationErrorHandler = (ctx, err) => {
//   ctx.status = 400;
//   ctx.body = {
//     success: false,
//     message: "DB validation error!!!",
//     err
//   };
//   return;
// };

const invalidJsonHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      responseHandler(ctx, false, "Invalid JSON payload", 400, null, "");
      return;
    }
    throw err;
  }
};

// global error handler
const ErrorHandler = (err, ctx) => {
  err.expose = true;

  if (err instanceof customError) {
    responseHandler(ctx, false, err.message, err.statusCode, err.errData, err);
    return;
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    responseHandler(ctx, false, "Invalid JSON payload", 400, null, err);

    return;
  }

  if (err instanceof MongoServerError) {
    // insert bulk write error handlers

    if (err.code === 121) {
      responseHandler(ctx, false, "something went wrong.", 500, null, err);

      return;
    }

    if (err.code === 11000) {
      responseHandler(ctx, false, "Email already exist!!!", 400, null, err);

      return;
    }
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    responseHandler(
      ctx,
      false,
      "Invalid or expired token..!!!",
      401,
      null,
      err
    );

    return;
  }

  const errStatus = err.statusCode || 500;
  console.log("error status in error handler ", err);

  const errMsg = err.message || "Something went wrong";

  responseHandler(ctx, false, "something went wrong!!!", errStatus, null, err);

  return;
};

module.exports = {
  customError,
  notFoundHandler,
  ErrorHandler,
  invalidJsonHandler,
  validationErrorHandler,
};
