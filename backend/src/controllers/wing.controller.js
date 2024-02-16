const { updateSocietyAnalytics } = require("../DB/society.db");
const { updateUserData } = require("../DB/user.db");
const {
  insertWing,
  deleteWingData,
  updateWingData,
  findWing,
  findWings
} = require("../DB/wing.db");
const { responseHandler } = require("../handlers/response.handler");
const { ROLES } = require("../utils/constants");

exports.addWing = async (ctx) => {
  const { societyId } = ctx.request.user;

  const { wingAdminId, ...restWingData } = ctx.request.body;

  if (wingAdminId && wingAdminId !== "") {
    const wingAdmin = await updateUserData(
      ctx.db,
      { _id: wingAdminId, societyId },
      { $set: { role: ROLES.WING_ADMIN } }
    );

    if (!wingAdmin) {
      responseHandler(
        ctx,
        false,
        "Wing admin must be a member of society!!!",
        400,
        null,
        "wing admin not found in addWing."
      );
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
  responseHandler(
    ctx,
    true,
    "Wing details added successfully!!!",
    201,
    { wing },
    "wing added : "
  );
  return;
};

exports.getWingDetails = async (ctx) => {
  const { wingId } = ctx.params;
  const { societyId } = ctx.request.user;

  const wing = await findWing(ctx.db, { _id: wingId, societyId });

  if (!wing) {
    responseHandler(
      ctx,
      false,
      "Wing details not found.",
      404,
      null,
      "wing not found."
    );
    return;
  }

  responseHandler(
    ctx,
    true,
    "Wing details fetched successfully!!!",
    200,
    { wing },
    "wing fetched : "
  );

  return;
};

exports.getWings = async (ctx) => {
  const { societyId } = ctx.request.user;

  const { skip, limit } = ctx.query;

  const sortFilter = {
    createdOn: -1
  };

  const wings = await findWings(ctx.db, { societyId }, skip, limit, sortFilter);

  responseHandler(
    ctx,
    true,
    "Wing details fetched successfully!!!",
    200,
    { totalWings: wings.length, wings },
    "wing fetched : "
  );

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
      responseHandler(
        ctx,
        false,
        "Wing admin must be a member of society!!!",
        400,
        null,
        "wing admin not found in updated wing."
      );
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
    responseHandler(
      ctx,
      false,
      "Wing details not found.",
      404,
      null,
      "wing not found in update wing."
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "Wing details updated successfully!!!",
    200,
    { wing },
    "wing updated : "
  );

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
    responseHandler(
      ctx,
      false,
      "Wing details not found.",
      404,
      null,
      "wing not found in deleted wing."
    );

    return;
  }

  await updateSocietyAnalytics(
    ctx.db,
    { _id: societyId },
    {
      $inc: { totalWings: -1 }
    }
  );

  responseHandler(
    ctx,
    true,
    "Wing details deleted successfully!!!",
    200,
    null,
    "wing deleted : "
  );
  return;
};
