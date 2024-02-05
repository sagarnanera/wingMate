const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.addWing = async (ctx) => {
  const WingCollection = ctx.db.collection("wings");
  const UserCollection = ctx.db.collection("users");

  const { societyId } = ctx.request.user;

  const { wingAdminId, ...restWingData } = ctx.request.body;

  if (wingAdminId && wingAdminId !== "") {
    const wingAdmin = await UserCollection.findOneAndUpdate(
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

  const _id = generateUUID();

  const wing = await WingCollection.insertOne({
    _id,
    societyId,
    wingAdminId,
    ...restWingData
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Wing details added successfully!!!",
    wing: { _id: wing.insertedId, ...restWingData }
  };
  return;
};

exports.getWingDetails = async (ctx) => {
  const WingCollection = ctx.db.collection("wings");
  const { wingId } = ctx.params;
  const { societyId } = ctx.request.user;
  const wing = await WingCollection.findOne({ _id: wingId, societyId });

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
  const WingCollection = ctx.db.collection("wings");

  const { societyId } = ctx.request.user;

  const wings = await WingCollection.find({ societyId }).toArray();

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Wings fetched successfully!!!",
    wings
  };
  return;
};

exports.updateWingDetails = async (ctx) => {
  const WingCollection = ctx.db.collection("wings");
  const UserCollection = ctx.db.collection("users");

  const { societyId } = ctx.request.user;
  const { wingId } = ctx.params;
  const { wingAdminId, ...restWingData } = ctx.request.body;

  if (wingAdminId && wingAdminId !== "") {
    const wingAdmin = await UserCollection.findOneAndUpdate(
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

  console.log("wing before update:", restWingData);

  const wing = await WingCollection.findOneAndUpdate(
    { _id: wingId, societyId },
    {
      $set: restWingData
    },
    { returnDocument: "after" }
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
  const WingCollection = ctx.db.collection("wings");
  const { societyId } = ctx.request.user;
  const { wingId } = ctx.params;

  const wing = await WingCollection.findOneAndDelete({
    _id: wingId,
    societyId
  });
  if (!wing) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Wing details not found." };
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "Wing details deleted successfully." };
  return;
};
