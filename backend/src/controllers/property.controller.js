const { deletePostData } = require("../DB/post.db");
const {
  insertProperty,
  findProperties,
  findProperty,
  updatePropertyData,
  deletePropertyData
} = require("../DB/property.db");
const { updateSocietyAnalytics } = require("../DB/society.db");

exports.addProperty = async (ctx) => {
  const { name, wingId, area, location, rentPerDay } = ctx.request.body;

  const { societyId } = ctx.request.user;

  const property = await insertProperty(ctx.db, {
    name,
    wingId,
    societyId,
    area,
    location,
    rentPerDay
  });

  if (!property) {
    ctx.status = 400;
    ctx.body = {
      success: true,
      message: "Unable to add property, try again later!!!"
    };
    return;
  }

  await updateSocietyAnalytics(
    ctx.db,
    { _id: societyId },
    {
      $inc: { totalProperties: 1 }
    }
  );

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Property added successfully!!!",
    property
  };
  return;
};

exports.getProperties = async (ctx) => {
  const { societyId } = ctx.request.user;

  const { wingId } = ctx.query;

  const searchQuery = {};

  if (wingId && wingId !== "") {
    searchQuery["wingId"] = wingId;
  } else {
    searchQuery["societyId"] = societyId;
  }

  const properties = await findProperties(ctx.db, searchQuery);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Properties fetched successfully!!!",
    properties
  };
  return;
};

exports.getProperty = async (ctx) => {
  const { societyId } = ctx.request.user;
  const { propertyId } = ctx.params;

  const property = await findProperty(ctx.db, {
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
  const { wingId, name, area, location, rentPerDay } = ctx.request.body;
  const { societyId } = ctx.request.user;
  const { propertyId } = ctx.params;

  const property = await updatePropertyData(
    ctx.db,
    { _id: propertyId, societyId },
    { wingId, name, area, location, rentPerDay }
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
  const { societyId } = ctx.request.user;
  const { propertyId: _id } = ctx.params;
  const property = await deletePropertyData(ctx.db, {
    _id,
    societyId
  });

  console.log("property", property);

  if (!property) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Property details not found." };
    return;
  }

  await updateSocietyAnalytics(
    ctx.db,
    { _id: societyId },
    {
      $inc: { totalProperties: -1 }
    }
  );

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Property details deleted successfully."
  };
  return;
};
