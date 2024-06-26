const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const {
  notFoundHandler,
  invalidJsonHandler,
  ErrorHandler,
} = require("./handlers/error.handler");
const tryCatchHandler = require("./handlers/globalTryCatch.handler");

const node_env = process.env.NODE_ENV || "DEV";

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
const miscRouter = require("./routes/misc.route");

const routes = [
  authRouter,
  userRouter,
  societyRouter,
  wingRouter,
  propertyRouter,
  postRouter,
  bookingRouter,
  eventRouter,
  postRouter,
  commentRouter,
  likeRouter,
  miscRouter,
];

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");

  console.log(
    `${new Date().toLocaleString()} - ${ctx.method} ${ctx.url} - ${
      ctx.status
    } - ${rt} - ${ctx.request.ip} - ${ctx.request.origin}`
  );
});

app.use(
  cors({
    origin:
      node_env === "PROD"
        ? process.env.FRONTEND_URL
        : "http://app.wingmate.local",
    credentials: true,
  })
);

// setting proxy for production, to enable secure cookies
if (node_env === "PROD") {
  app.proxy = true;
}

// heath check
app.use(async (ctx, next) => {
  if (ctx.path === "/") {
    ctx.body = {
      status: 200,
      message: "wingMate API server is up and running!",
    };
  } else {
    await next();
  }
});

// middlewares
app.use(invalidJsonHandler);
app.use(bodyParser());
app.use(tryCatchHandler);

routes.forEach((route) => app.use(route.routes()));

app.use(notFoundHandler);
app.on("error", ErrorHandler);

module.exports = app;
