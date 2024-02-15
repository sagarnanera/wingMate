const { verifyJWTToken } = require("../services/jwt.service");
const { customError } = require("../handlers/error.handler");
const { findUser } = require("../DB/user.db");

const authenticate = (authenticatedRoles) => {
  return async (ctx, next) => {
    const token = ctx.cookies.get("token");

    // console.log("token", token);

    if (!token) {
      throw new customError("Not Authorized. Token not found !!!", 401);
    }

    const { _id } = verifyJWTToken(token);

    const user = await findUser(ctx.db, { _id });

    // console.log(user);

    if (!user) {
      throw new customError("User not found.", 401);
    }

    if (!authenticatedRoles.includes(user.role)) {
      throw new customError("User unauthorized to perform action!!!", 401);
    }

    ctx.request.user = user;
    await next();
  };
};

module.exports = authenticate;
