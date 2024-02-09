const { ErrorHandler } = require("./error.handler");

const tryCatchHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // console.log("here in global try-catch", error);
    ErrorHandler(error, ctx);
  }
};

module.exports = tryCatchHandler;
