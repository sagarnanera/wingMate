const {
  insertProperty,
  findProperties,
  findProperty,
  updatePropertyData,
  deletePropertyData
} = require("../DB/property.db");
const { updateSocietyAnalytics } = require("../DB/society.db");
const { responseHandler } = require("../handlers/response.handler");

exports.addProperty = async (ctx) => {
  const { name, wingId, area, location, rentPerDay } = ctx.request.body;
  const { societyId } = ctx.request.user;

  const propertyData = {
    name,
    area,
    location,
    rentPerDay,
    societyId,
    createdOn: new Date()
  };

  if (wingId) {
    Object.assign(propertyData, {
      wingId
    });
  }

  const property = await insertProperty(ctx.db, propertyData);

  if (!property) {
    responseHandler(
      ctx,
      false,
      "Unable to add property, try again later!!!",
      400,
      null,
      "property not added."
    );
    return;
  }

  await updateSocietyAnalytics(
    ctx.db,
    { _id: societyId },
    {
      $inc: { totalProperties: 1 }
    }
  );

  responseHandler(
    ctx,
    true,
    "Property added successfully!!!",
    201,
    { property },
    "property added : "
  );

  return;
};

exports.getProperties = async (ctx) => {
  const { societyId } = ctx.request.user;

  const { wingId, skip, limit } = ctx.query;

  const searchQuery = {};

  if (wingId && wingId !== "") {
    searchQuery["wingId"] = wingId;
  } else {
    searchQuery["societyId"] = societyId;
  }

  const sortFilter = {
    createdOn: -1
  };

  const properties = await findProperties(
    ctx.db,
    searchQuery,
    skip,
    limit,
    sortFilter
  );

  responseHandler(
    ctx,
    true,
    "Properties fetched successfully!!!",
    200,
    { totalFetchedProperties: properties.length, properties },
    "property list fetched : "
  );
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
    responseHandler(
      ctx,
      false,
      "property not found.",
      404,
      null,
      "property not found at controller."
    );
    return;
  }

  responseHandler(
    ctx,
    true,
    "Property fetched successfully!!!",
    200,
    { property },
    "property fetched"
  );
  return;
};

exports.updateProperty = async (ctx) => {
  const { wingId, name, area, location, rentPerDay } = ctx.request.body;
  const { societyId } = ctx.request.user;
  const { propertyId } = ctx.params;

  // const propertyData = { name, area, location, rentPerDay };

  // if (wingId) {
  //   Object.assign(propertyData, {
  //     wingId
  //   });
  // }

  const property = await updatePropertyData(
    ctx.db,
    { _id: propertyId, societyId },
    { name, area, location, rentPerDay, wingId }
  );

  console.log("property after update:", property);

  if (!property) {
    responseHandler(
      ctx,
      false,
      "property not found.",
      404,
      null,
      "property not found at update controller."
    );
    return;
  }

  responseHandler(
    ctx,
    true,
    "Property details updated successfully!!!",
    200,
    { property },
    "property updated."
  );
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
    responseHandler(
      ctx,
      false,
      "property not found.",
      404,
      null,
      "property not found at delete controller."
    );
    return;
  }

  await updateSocietyAnalytics(
    ctx.db,
    { _id: societyId },
    {
      $inc: { totalProperties: -1 }
    }
  );

  // TODO : delete all data related to property (bookings, events etc...)

  responseHandler(
    ctx,
    true,
    "Property details deleted successfully.",
    200,
    null,
    "property deleted."
  );
  return;
};
