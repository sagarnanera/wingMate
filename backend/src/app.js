const koa = require("koa");
const authRouter = require("./routes/auth.route");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const {
  notFoundHandler,
  invalidJsonHandler,
  ErrorHandler
} = require("./handlers/error.handler");
const tryCatchHandler = require("./handlers/globalTryCatch.handler");

// koa app
const app = new koa();

// app.use(connectDB);
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ErrorHandler(err, ctx);
//   }
// });

app.use(tryCatchHandler);

// middlewares
app.use(json());
app.use(bodyParser());

app.use(authRouter.routes());
// .use(authRouter.allowedMethods());

app.use(notFoundHandler);
app.use(invalidJsonHandler);
app.on("error", ErrorHandler);

module.exports = app;
