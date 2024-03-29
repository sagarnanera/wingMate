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
const societyRouter = require("./routes/society.route");
const wingRouter = require("./routes/wing.route");
const propertyRouter = require("./routes/property.route");
const bookingRouter = require("./routes/booking.route");
const eventRouter = require("./routes/event.route");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");
const likeRouter = require("./routes/like.route");

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

app.use(authRouter.routes()); // .use(authRouter.allowedMethods());
app.use(userRouter.routes());
app.use(societyRouter.routes());
app.use(wingRouter.routes());
app.use(propertyRouter.routes());
app.use(bookingRouter.routes());
app.use(eventRouter.routes());
app.use(postRouter.routes());
app.use(commentRouter.routes());
app.use(likeRouter.routes());

app.use(notFoundHandler);
app.on("error", ErrorHandler);

module.exports = app;
