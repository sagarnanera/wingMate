const { updateUserData, findUsers, deleteUserData } = require("../DB/user.db");
const { responseHandler } = require("../handlers/response.handler");
const { hashPassword } = require("../services/password.service");
const { ROLES } = require("../utils/constants");

exports.getUser = async (ctx) => {
  const { password, ...user } = ctx.request.user;

  responseHandler(
    ctx,
    true,
    "User fetched successfully!!!",
    200,
    { user },
    "user fetched : "
  );

  return;
};

exports.getAllUsers = async (ctx) => {
  //   const query = { role: ctx.request.user.role };

  const { skip, limit } = ctx.query;
  const query = {};

  // TODO : get all users of society / wing except the requesting user.

  if (ctx.request.user.role === ROLES.SECRETORY)
    query["societyId"] = ctx.request.user?.societyId;
  else query["wingId"] = ctx.request.user?.wingId;

  const sortFilter = {
    createdOn: -1
  };

  const users = await findUsers(ctx.db, query, skip, limit, sortFilter);

  console.log("users", users);

  responseHandler(
    ctx,
    true,
    "Users fetched successfully!!!",
    200,
    { totalUserFetched: users.length, users },
    "users fetched : "
  );
  return;
};

exports.verifyUser = async (ctx) => {
  const { _id } = ctx.request.body;

  const user = await updateUserData(
    ctx.db,
    { _id },
    {
      $set: {
        isVerified: true,
        verifiedBy: id._id
      }
    }
  );

  if (!user) {
    responseHandler(
      ctx,
      true,
      "User not found.",
      404,
      null,
      "user not found in verify user : "
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "User verified successfully!!!",
    200,
    { user },
    "users fetched : "
  );

  return;
};

exports.updateUseRole = async (ctx) => {
  const { role, _id } = ctx.request.body;

  const user = await updateUserData(ctx.db, { _id }, { $set: { role } });

  if (!user) {
    responseHandler(
      ctx,
      true,
      "User not found.",
      404,
      null,
      "user not found in update role : "
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    `User Role updated to : ${user.role}`,
    200,
    { user },
    "user role updated : "
  );

  return;
};

exports.updateUser = async (ctx) => {
  const { _id } = ctx.request.user;
  const { name, contact, wingId } = ctx.request.body;

  const user = await updateUserData(
    ctx.db,
    { _id },
    { $set: { name, contact, wingId } }
  );

  console.log("user in update:", user);

  if (!user) {
    responseHandler(
      ctx,
      true,
      "User not found.",
      404,
      null,
      "user not found in update user : "
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "User updated successfully!!!",
    200,
    { user },
    "user updated : "
  );

  return;
};

exports.deleteUser = async (ctx) => {
  const { _id } = ctx.request.user;

  const user = await deleteUserData(ctx.db, { _id });
  if (!user) {
    responseHandler(
      ctx,
      true,
      "User not found.",
      404,
      null,
      "user not found in delete user : "
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "User deleted successfully.",
    200,
    null,
    "user deleted : "
  );

  return;
};

exports.updatePassword = async (ctx) => {
  const { _id } = ctx.request.user;

  const { password } = ctx.request.body;
  const newHash = await hashPassword(password);

  const user = await updateUserData(
    ctx.db,
    { _id },
    { $set: { password: newHash } }
  );

  if (!user) {
    responseHandler(
      ctx,
      true,
      "User not found.",
      404,
      null,
      "user not found in update password : "
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "User password updated successfully.",
    200,
    { user },
    "user password updated : "
  );

  return;
};
