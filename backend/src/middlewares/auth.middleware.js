const { verifyJWTToken } = require("../services/jwtService");
const User = require("../models/user.model");
const { customError } = require("../handlers/error.handler");
const tryCatchHandler = require("../handlers/globalTryCatch.handler");

const authenticate = tryCatchHandler(async (ctx, next) => {
  const token = ctx.cookies.get("token");

  console.log("token", token);

  //   if (!token) {
  //     throw new customError("Not Authorized. Token not found !!!", 401);
  //   }

  //   const { _id } = verifyJWTToken(token);

  //   const user = await new User().getUserById(_id);

  //   if (!user) {
  //     throw new customError("User not found.", 401);
  //   }

  ctx.request.user = { userName: "Hello from auth middleware" };
  await next();
});

module.exports = authenticate;
