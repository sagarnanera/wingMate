const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

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

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    ctx.status = 401;
    ctx.body = { success: false, message: "Invalid or expired token..." };
    return;
  }

  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  console.log("caught in globalErrorHandler :", err);
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
