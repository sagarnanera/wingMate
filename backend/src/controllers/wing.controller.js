const { updateSocietyAnalytics } = require("../DB/society.db");
const { updateUserData } = require("../DB/user.db");
const {
  insertWing,
  deleteWingData,
  updateWingData,
  findWing,
  findWings
} = require("../DB/wing.db");
const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.addWing = async (ctx) => {
  const { societyId } = ctx.request.user;

  const { wingAdminId, ...restWingData } = ctx.request.body;

  if (wingAdminId && wingAdminId !== "") {
    const wingAdmin = await updateUserData(
      ctx.db,
      { _id: wingAdminId, societyId },
      { $set: { role: ROLES.WING_ADMIN } }
    );

    console.log("wingAdmin", wingAdmin);

    if (!wingAdmin) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Wing admin must be a member of society!!!"
      };
      return;
    }
  }

  const wing = await insertWing(ctx.db, {
    societyId,
    wingAdminId,
    ...restWingData
  });

  await updateSocietyAnalytics(
    ctx.db,
    { _id: societyId },
    {
      $inc: { totalWings: 1 }
    }
  );

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Wing details added successfully!!!",
    wing
  };
  return;
};

exports.getWingDetails = async (ctx) => {
  const { wingId } = ctx.params;
  const { societyId } = ctx.request.user;

  const wing = await findWing(ctx.db, { _id: wingId, societyId });

  if (!wing) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Wing details not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Wing details fetched successfully!!!",
    wing
  };
  return;
};

exports.getWings = async (ctx) => {
  const { societyId } = ctx.request.user;

  const wings = await findWings(ctx.db, { societyId });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Wings fetched successfully!!!",
    wings
  };
  return;
};

exports.updateWingDetails = async (ctx) => {
  const { societyId } = ctx.request.user;
  const { wingId } = ctx.params;
  const { wingAdminId, ...restWingData } = ctx.request.body;

  if (wingAdminId && wingAdminId !== "") {
    const wingAdmin = await updateUserData(
      ctx.db,
      { _id: wingAdminId, societyId },
      { $set: { role: ROLES.WING_ADMIN } }
    );

    console.log("wingAdmin", wingAdmin);

    if (!wingAdmin) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Wing admin must be a member of society!!!"
      };
      return;
    }

    restWingData["wingAdminId"] = wingAdminId;
  }

  console.log("wing before update:", restWingData);

  const wing = await updateWingData(
    ctx.db,
    { _id: wingId, societyId },
    restWingData
  );

  console.log("wing after update:", wing);

  if (!wing) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Wing details not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Wing details updated successfully!!!",
    wing
  };
  return;
};

exports.deleteWingDetails = async (ctx) => {
  const { societyId } = ctx.request.user;
  const { wingId } = ctx.params;

  const wing = await deleteWingData(ctx.db, {
    _id: wingId,
    societyId
  });

  if (!wing) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Wing details not found." };
    return;
  }

  await updateSocietyAnalytics(
    ctx.db,
    { _id: societyId },
    {
      $inc: { totalWings: -1 }
    }
  );

  ctx.status = 200;
  ctx.body = { success: true, message: "Wing details deleted successfully." };
  return;
};
