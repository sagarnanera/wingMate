const { findSociety } = require("../DB/society.db");
const { updateUserData, findUserWithPass } = require("../DB/user.db");
const cookieOptions = require("../config/cookie.config");
const { customError } = require("../handlers/error.handler");
const { responseHandler } = require("../handlers/response.handler");
const { genJWTToken, verifyJWTToken } = require("../services/jwt.service");
const { compareHash, hashPassword } = require("../services/password.service");
const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.loginController = async (ctx) => {
  // const User = ctx.db.collection("users");
  const { email, password } = ctx.request.body;

  // const user = await User.findOne({ email: email });
  const { society, ...user } = await findUserWithPass(ctx.db, { email: email });

  if (!user || Object.keys(user).length === 0) {
    // ctx.status = 404;
    // ctx.body = { success: false, message: "User not found." };

    responseHandler(
      ctx,
      false,
      "User not found.",
      404,
      null,
      "User not found in login."
    );
    return;
  }

  const isMatch = await compareHash(password, user.password);

  if (!isMatch) {
    // ctx.status = 400;
    // ctx.body = { success: false, message: "Invalid Credentials !!!" };
    responseHandler(
      ctx,
      false,
      "Invalid Credentials !!!",
      400,
      null,
      "Invalid Credentials !!!"
    );
    return;
  }

  const payload = {
    _id: user._id,
  };

  // Sign token
  const token = genJWTToken(payload);

  const {
    password: passwd,
    resetPasswordExpires,
    resetPasswordToken,
    ...userData
  } = user;

  ctx.cookies.set("token", token, cookieOptions);

  // ctx.status = 200;
  // ctx.body = {
  //   success: true,
  //   message: "logged in successfully",
  //   user: userData,
  //   token: token
  // };

  responseHandler(
    ctx,
    true,
    "logged in successfully",
    200,
    { user: userData, token, society },
    "user logged in."
  );

  return;
};

exports.registerController = async (ctx) => {
  const {
    password: userPass,
    wingId,
    name,
    contact,
    _id,
    societyId,
  } = ctx.request.body;

  // const { email, password, wingId, name, contact } = ctx.request.body;

  const { invitationToken } = ctx.query;

  // const { _id, societyId } = verifyJWTToken(invitationToken);

  const hash = await hashPassword(userPass);

  const user = await updateUserData(
    ctx.db,
    { _id, societyId, invitationToken },
    {
      $set: {
        password: hash,
        wingId,
        role: ROLES.RESIDENT,
        totalPost: 0,
        name,
        contact,
        createdOn: new Date(),
      },
      $unset: {
        invitationToken: 1,
      },
    }
  );

  if (!user) {
    // ctx.status = 404;
    // ctx.body = {
    //   success: false,
    //   message: "User not found or already registered!!!"
    // };

    responseHandler(
      ctx,
      false,
      "User not found or already registered!!!",
      404,
      null,
      "User not found or already registered in register. "
    );
    return;
  }

  const payload = {
    _id,
  };

  const society = await findSociety(ctx.db, { _id: societyId });

  const token = genJWTToken(payload);

  ctx.cookies.set("token", token, cookieOptions);

  responseHandler(
    ctx,
    true,
    "Registered in successfully",
    200,
    { user, token, society },
    "user registered."
  );

  return;
};

exports.logoutController = async (ctx) => {
  ctx.cookies.set("token", "", cookieOptions);
  ctx.body = { success: "true", message: "Successfully Logged Out" };
};

// forgot password
exports.ForgotPass = async (ctx) => {
  // const { email } = ctx.request.user;

  const user = ctx.request.user;

  // if (!user) {
  //   throw new customError("User with this email does not exist.", 404);
  // }

  const token = generateUUID();

  const resetPasswordToken = token;
  const resetPasswordExpires = new Date(Date.now() + 3600000);

  await updateUserData(
    ctx.db,
    { _id: user._id },
    {
      $set: {
        resetPasswordExpires,
        resetPasswordToken,
      },
    }
  );

  const resetPassLink = `http://localhost:8080/api/auth/reset-password/${token}`;

  responseHandler(
    ctx,
    true,
    "Successfully generated reset password link.",
    200,
    { resetPassLink },
    "in password forgot"
  );
  return;
};

exports.ResetPass = async (ctx) => {
  const { password } = ctx.request.body;

  const user = ctx.request.user;

  const newHash = await hashPassword(password);

  await updateUserData(
    ctx.db,
    { _id: user._id },
    {
      $set: {
        password: newHash,
      },
      $unset: {
        resetPasswordExpires: 1,
        resetPasswordToken: 1,
      },
    }
  );

  responseHandler(
    ctx,
    true,
    "Password reset successful.",
    200,
    null,
    "password reset successful."
  );

  return;
};
