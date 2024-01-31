const koa = require("koa");
const authRouter = require("./routes/auth.route");
const bodyParser = require("koa-bodyparser");
const {
  notFoundHandler,
  invalidJsonHandler,
  ErrorHandler
} = require("./handlers/error.handler");
const tryCatchHandler = require("./handlers/globalTryCatch.handler");

// koa app
const app = new koa();

// middlewares
app.use(invalidJsonHandler);
app.use(bodyParser());

app.use(tryCatchHandler);
app.use(authRouter.routes());
// .use(authRouter.allowedMethods());

app.use(notFoundHandler);
app.on("error", ErrorHandler);

module.exports = app;
