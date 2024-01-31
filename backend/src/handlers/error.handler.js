const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

// custom error
class customError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}

//  ErrorHandlers
const notFoundHandler = async (ctx, next) => {
  ctx.status = 404;
  ctx.body = {
    success: false,
    message: "Not found, Check the URL properly !!!"
  };

  // await next();
  return;
};

const invalidJsonHandler = async (err, ctx, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    ctx.status = 400;
    ctx.body = { success: false, message: "Invalid JSON payload" };
    return;
  }

  await next(err);
};

// global error handler
const ErrorHandler = (err, ctx) => {
  if (err instanceof customError) {
    console.log("custom error", err);

    ctx.status = err.statusCode;
    ctx.body = { success: false, message: err.message };
    return;
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    ctx.status = 401;
    ctx.body = { success: false, message: "Invalid or expired token..." };
    return;
  }

  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

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
