const { hashPassword } = require("../services/password.service");
const { ROLES } = require("../utils/constants");

exports.getUser = async (ctx) => {
  // const UserCollection = ctx.db.collection("users");

  const { password, ...user } = ctx.request.user;
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "User fetched successfully!!!",
    user
  };
  return;
};

exports.getAllUsers = async (ctx) => {
  const UserCollection = ctx.db.collection("users");

  //   const query = { role: ctx.request.user.role };
  const query = {};

  // TODO : get all users of society / wing except the requesting user.

  if (ctx.request.user.role === ROLES.SECRETORY)
    query["societyId"] = ctx.request.user.societyId;
  else query["wingId"] = ctx.request.user.wingId;

  console.log("query :", query);

  const users = await UserCollection.find(query, {
    projection: { password: 0 }
  }).toArray();

  console.log("users", users);

  ctx.status = 200;
  ctx.body = { success: true, message: "Users fetched successfully", users };
  return;
};

exports.verifyUser = async (ctx) => {
  //   const id = req.user;
  //   const { error } = userIdObjectValidator.validate(req.body);
  //   if (error) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: error.details[0].message });
  //   }
  const { _id } = ctx.request.body;

  const UserCollection = ctx.db.collection("users");

  const user = await UserCollection.findOneAndUpdate(
    _id,
    {
      isVerified: true,
      verifiedBy: id._id
    },
    { returnDocument: "After" }
  );
  //   .select("userName isVerified verifiedBy email isEmailVerified ");

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "User verified successfully!!!",
    user
  };
  return;
};

exports.updateUseRole = async (ctx) => {
  //   const { error } = useAccountRoleValidator.validate(req.body);
  //   if (error) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: error.details[0].message });
  //   }

  const UserCollection = ctx.db.collection("users");

  const { role, _id } = ctx.request.body;

  const user = await UserCollection.findOneAndUpdate(
    { _id },
    {
      $set: { role }
    },
    { returnDocument: "After", projection: { password: 0 } }
  );
  // .select("role isVerified verifiedBy email isEmailVerified ");

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: `User Role updated to : ${user.role}`,
    user
  };
  return;
};

exports.updateUser = async (ctx) => {
  //   const { error } = userValidator.validate(req.body);
  //   if (error) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: error.details[0].message });
  //   }
  const { _id } = ctx.request.user;
  const { email, password, ...restUserData } = ctx.request.body;

  const UserCollection = ctx.db.collection("users");

  let dataToUpdate = {};

  if (password) {
    dataToUpdate["password"] = await hashPassword(password);
  }

  if (email) {
    dataToUpdate["email"] = email;
  }

  dataToUpdate = { ...dataToUpdate, ...restUserData };
  console.log("user in update:", dataToUpdate);

  const user = await UserCollection.findOneAndUpdate(
    { _id },
    {
      $set: {
        ...dataToUpdate
      }
    },
    { returnDocument: "after", projection: { password: 0 } }
  );
  // .select("userName email isEmailVerified");
  console.log("user in update:", user);

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "User updated successfully!!!", user };
  return;
};

exports.deleteUser = async (ctx) => {
  const UserCollection = ctx.db.collection("users");
  const { _id } = ctx.request.user;

  const user = await UserCollection.findOneAndDelete({ _id });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "User deleted successfully." };
  return;
};

exports.updatePassword = async (ctx) => {
  //   const { error } = passwordValidator.validate(req.body);

  //   if (error) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: error.details[0].message });
  //   }

  const { _id } = ctx.request.user;
  const UserCollection = ctx.db.collection("users");

  console.log("_id", _id);

  const { password } = ctx.request.body;
  const newHash = await hashPassword(password);

  const user = await UserCollection.findOneAndUpdate(
    { _id },
    { $set: { password: newHash } },
    {
      returnDocument: "after",
      projection: {
        password: 0,
        resetPasswordExpires: 0,
        resetPasswordToken: 0
      }
    }
  );

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "User password updated successfully.",
    user
  };
  return;
};
