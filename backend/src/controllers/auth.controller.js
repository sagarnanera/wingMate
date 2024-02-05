const { genJWTToken } = require("../services/jwt.service");
const { compareHash, hashPassword } = require("../services/password.service");
const generateUUID = require("../utils/generateUUID");

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  secure: false,
  httpOnly: true,
  sameSite: "none"
};

exports.loginController = async (ctx) => {
  const User = ctx.db.collection("users");
  const { email, password } = ctx.request.body;

  const user = await User.findOne({ email: email });

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
  const UserCollection = ctx.db.collection("users");
  const SocietyCollection = ctx.db.collection("societies");
  const {
    email,
    password: userPass,
    wingId,
    ...restUserData
  } = ctx.request.body;

  const { societyId } = ctx.query;

  const isExist = await UserCollection.findOne({ email });

  if (isExist) {
    ctx.status = 402;
    ctx.body = { success: false, message: "User already exist!!" };
    return;
  }

  const isSocietyExist = await SocietyCollection.findOne({ _id: societyId });

  if (!isSocietyExist) {
    ctx.status = 400;
    ctx.body = { success: false, message: "Society does'nt exist!!" };
    return;
  }

  const hash = await hashPassword(userPass);
  const _id = generateUUID();

  const res = await UserCollection.insertOne({
    _id: _id,
    email: email,
    password: hash,
    societyId,
    wingId,
    ...restUserData
  });

  console.log("user :", res);

  const payload = {
    _id
  };

  const token = genJWTToken(payload);

  const user = { _id, email, ...restUserData };

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
