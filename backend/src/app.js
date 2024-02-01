const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const {
  notFoundHandler,
  invalidJsonHandler,
  ErrorHandler
} = require("./handlers/error.handler");
const tryCatchHandler = require("./handlers/globalTryCatch.handler");

// koa app
const app = new koa();

// routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// middlewares
app.use(invalidJsonHandler);
app.use(bodyParser());

app.use(tryCatchHandler);
app.use(authRouter.routes());
// .use(authRouter.allowedMethods());
app.use(userRouter.routes());

app.use(notFoundHandler);
app.on("error", ErrorHandler);

module.exports = app;
