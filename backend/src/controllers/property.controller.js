const { PROPERTY_TYPE } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.addProperty = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");
  const { name, wingId, area, location } = ctx.request.body;

  const { societyId } = ctx.request.user;

  const _id = generateUUID();

  //   {
  //     _id,
  //      name,
  //      wingId / societyId
  //      area,
  // }

  // const entityId = {};

  // if (type === PROPERTY_TYPE.WING) {
  //   entityId["wingId"] = wingId;
  // }

  const property = await PropertyCollection.insertOne({
    _id,
    name,
    wingId,
    societyId,
    area,
    location
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Property added successfully!!!",
    property
  };
  return;
};

exports.getProperties = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");

  const { societyId } = ctx.request.user;

  const { wingId } = ctx.query;

  const searchQuery = {};

  if (wingId && wingId !== "") {
    searchQuery["wingId"] = wingId;
  } else {
    searchQuery["societyId"] = societyId;
  }

  const properties = await PropertyCollection.find(searchQuery).toArray();

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Properties fetched successfully!!!",
    properties
  };
  return;
};

exports.getProperty = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");

  const { societyId } = ctx.request.user;
  const { propertyId } = ctx.params;

  const property = await PropertyCollection.findOne({
    _id: propertyId,
    societyId
  });

  if (!property) {
    ctx.status = 404;
    ctx.body = { success: false, message: "property not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Property fetched successfully!!!",
    property
  };
  return;
};

exports.updateProperty = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");

  // const { _id } = ctx.request.user;
  const propertyData = ctx.request.body;
  const { societyId } = ctx.request.user;
  const { propertyId } = ctx.params;
  console.log("propertyData before update:", propertyData);

  const property = await PropertyCollection.findOneAndUpdate(
    { _id: propertyId, societyId },
    {
      $set: propertyData
    },
    { returnDocument: "after" }
  );

  console.log("property after update:", property);

  if (!property) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Property not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Property details updated successfully!!!",
    property
  };
  return;
};

exports.deleteProperty = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");

  const { societyId } = req.request.user;

  const property = await PropertyCollection.findOneAndDelete({
    _id,
    societyId
  });

  if (!property) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Property details not found." };
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Property details deleted successfully."
  };
  return;
};
