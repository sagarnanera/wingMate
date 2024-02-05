const { PROPERTY_TYPE } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.addWing = async (ctx) => {
  const WingCollection = ctx.db.collection("wings");

  const { societyId } = ctx.request.user;

  const wingData = ctx.request.body;

  const _id = generateUUID();

  const wing = await WingCollection.insertOne({
    _id,
    societyId,
    ...wingData
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Wing details added successfully!!!",
    wing: { _id: wing.insertedId, wingData }
  };
  return;
};

exports.getWingDetails = async (ctx) => {
  const WingCollection = ctx.db.collection("wings");
  const { wingId } = ctx.params;
  const wing = await WingCollection.findOne({ _id: wingId });

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
  const { wingId } = ctx.request.user;
  const wingData = ctx.request.body;

  console.log("wing before update:", wingData);

  const wing = await UserCollection.findOneAndUpdate(
    { _id: wingId },
    {
      $set: wingData
    },
    { returnDocument: "after", projection: { password: 0 } }
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
  const { wingId } = ctx.request.user;

  const wing = await WingCollection.findOneAndDelete({ _id: wingId });
  if (!wing) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Wing details not found." };
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "Wing details deleted successfully." };
  return;
};
