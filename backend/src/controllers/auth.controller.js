const { updateUserData, findUserWithPass } = require("../DB/user.db");
const cookieOptions = require("../config/cookie.config");
const { customError } = require("../handlers/error.handler");
const { genJWTToken, verifyJWTToken } = require("../services/jwt.service");
const { compareHash, hashPassword } = require("../services/password.service");
const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.loginController = async (ctx) => {
  // const User = ctx.db.collection("users");
  const { email, password } = ctx.request.body;

  // const user = await User.findOne({ email: email });
  const user = await findUserWithPass(ctx.db, { email: email });

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
    return;
  }

  const isMatch = await compareHash(password, user.password);

  if (!isMatch) {
    ctx.status = 400;
    ctx.body = { success: false, message: "Invalid Credentials !!!" };
    return;
  }

  const payload = {
    _id: user._id
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

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "logged in successfully",
    user: userData,
    token: token
  };
};

exports.registerController = async (ctx) => {
  const {
    password: userPass,
    wingId,
    name,
    contact,
    _id,
    societyId
  } = ctx.request.body;

  // const { email, password, wingId, name, contact } = ctx.request.body;

  const { invitationToken } = ctx.query;

  // const { _id, societyId } = verifyJWTToken(invitationToken);

  console.log(_id, societyId);

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
        contact
      },
      $unset: {
        invitationToken: 1
      }
    }
  );

  if (!user) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      message: "User not found or already registered!!!"
    };
    return;
  }

  console.log("user after update :", user);

  const payload = {
    _id
  };

  const token = genJWTToken(payload);

  ctx.cookies.set("token", token, cookieOptions);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Registered in successfully",
    user,
    token: token
  };

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
        resetPasswordToken
      }
    }
  );

  const resetPassLink = `http://localhost:8080/api/auth/reset-password/${token}`;

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Successfully generated reset password link.",
    resetPassLink
  };
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
        password: newHash
      },
      $unset: {
        resetPasswordExpires: 1,
        resetPasswordToken: 1
      }
    }
  );

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Password reset successful."
  };
  return;
};
