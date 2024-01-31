const { ErrorHandler } = require("./error.handler");

// const tryCatchHandler = (controller) => async (ctx, next) => {
//   try {
//     await controller(ctx, next);
//   } catch (error) {
//     // ctx.status = error.statusCode;
//     // ctx.body = error.message;
//     // throw error;
//     ErrorHandler(error, ctx);
//     // await next(error);
//   }
// };

const tryCatchHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ErrorHandler(error, ctx);
  }
};

module.exports = tryCatchHandler;
