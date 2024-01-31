exports.loginController = async (ctx) => {
  // const User = getDBInstance().collection("users");
  const User = ctx.db.collection("users");

  // const user = await User.insertOne({ name: "sk" });
  // console.log(user);
  // ctx.status = 200;
  // ctx.body = { success: true, message: "hey from login" };

  const { email, password } = ctx.request.body;

  const user = await User.findOne({ name: "sk" });

  if (!user) {
    // res.status(404).json({ success: false, message: "User not found." });
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "User fetched successfully!!!", user };

  // const isMatch = await compareHash(password, user.password);

  // if (!isMatch) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Invalid Credentials !!!" });
  // }

  // const payload = {
  //   _id: user._id
  // };

  // // Sign token
  // const token = genJWTToken(payload);

  // const {
  //   password: passwd,
  //   resetPasswordExpires,
  //   resetPasswordToken,
  //   ...userData
  // } = user;

  // return res.status(200).cookie("token", token, CookieOptions).json({
  //   success: true,
  //   message: "logged in successfully",
  //   user: userData
  // });
};
exports.registerController = async (ctx) => {
  // ctx.status = 200;
  // ctx.body = { message: "hey from register" };
};
exports.logoutController = async (ctx) => {
  ctx.status = 200;
  ctx.body = { message: "hey from logout" };
};
