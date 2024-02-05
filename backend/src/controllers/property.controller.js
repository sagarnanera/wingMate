const generateUUID = require("../utils/generateUUID");

exports.addProperty = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");
  const { name, type, area, location } = ctx.request.body;

  const _id = generateUUID();

  //   {
  //     _id,
  //      name,
  //      wingId / societyId
  //      area,
  // }

  const property = await PropertyCollection.insertOne({
    _id,
    name,
    type,
    area,
    location
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Booked properties successfully!!!",
    property
  };
  return;
};

exports.getProperties = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");

  const { societyId } = ctx.request.user;

  const properties = await PropertyCollection.find({ societyId }).toArray();

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Bookings fetched successfully!!!",
    properties
  };
  return;
};

exports.getProperty = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");

  const { propertyId } = ctx.params;

  const property = await PropertyCollection.find({ _id: propertyId });

  if (!user) {
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
  const { _id } = ctx.request.user;
  const propertyData = ctx.request.body;

  const PropertyCollection = ctx.db.collection("properties");

  console.log("propertyData in update:", propertyData);

  const property = await PropertyCollection.findOneAndUpdate(
    { _id },
    {
      $set: propertyData
    },
    { returnDocument: "after" }
  );

  console.log("property in update:", property);

  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = { success: true, message: "User updated successfully!!!", user };
  return;
};

exports.deleteProperty = async (ctx) => {
  const PropertyCollection = ctx.db.collection("properties");

  const user = await PropertyCollection.findOneAndDelete({ _id });
  if (!user) {
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
