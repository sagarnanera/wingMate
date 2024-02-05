const { genJWTToken } = require("../services/jwt.service");
const { hashPassword } = require("../services/password.service");
const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.societyRegistration = async (ctx) => {
  const SocietyCollection = ctx.db.collection("societies");
  const UserCollection = ctx.db.collection("users");
  const {
    name,
    location,
    area,
    secretoryEmail,
    secretoryName,
    secretoryPassword
  } = ctx.request.body;

  const _id = generateUUID();
  const secretoryId = generateUUID();

  //   {
  //       _id,
  //       name,
  //       totalWings,
  //       totalHouses,
  //       Location,
  //       totalProperties,
  //       area,
  //       secretoryId;
  //   }

  const hash = await hashPassword(secretoryPassword);

  const secretory = UserCollection.insertOne({
    _id: secretoryId,
    name: secretoryName,
    email: secretoryEmail,
    password: hash,
    societyId: _id,
    role: ROLES.SECRETORY
  });

  const society = SocietyCollection.insertOne({
    _id,
    secretoryId,
    name,
    location,
    area
  });

  const promise = await Promise.all([secretory, society]);

  console.log("promise", promise);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Society registered successfully!!!",
    society: {
      _id: promise[1].insertedId,
      name,
      location,
      area,
      secretoryEmail,
      secretoryId,
      secretoryName
    }
  };
  return;
};

exports.getSocietyDetails = async (ctx) => {
  const SocietyCollection = ctx.db.collection("societies");

  const { societyId } = ctx.request.user;

  const society = await SocietyCollection.findOne({ _id: societyId });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Society details fetched successfully!!!",
    society
  };
  return;
};

exports.addResidents = async (ctx) => {
  const SocietyCollection = ctx.db.collection("societies");
  const { societyId } = ctx.request.user;
  const { residents } = ctx.request.body;
  const society = await SocietyCollection.findOne({ _id: societyId });

  if (!society) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Society details not found." };
    return;
  }

  //TODO: send invitation mail to residents with register link - send jwt with societyId + userEmail

  const invitationLinks = [];
  residents.forEach((email) => {
    // const invitationToken = genJWTToken({ societyId, email: email });
    invitationLinks.push(
      `http://localhost:8080/api/v1/auth/register?societyId=${societyId}&residentEmail=${email}`
    );
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Invitation mail sent successfully to residents!!!",
    invitationLinks
  };
  return;
};

exports.updateSocietyDetails = async (ctx) => {
  const societyData = ctx.request.body;
  const SocietyCollection = ctx.db.collection("societies");

  const { societyId } = ctx.request.user;

  const society = await SocietyCollection.findOneAndUpdate(
    { _id: societyId },
    {
      $set: societyData
    },
    { returnDocument: "after" }
  );

  console.log("society :", society, societyId);

  if (!society) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Society details not found." };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Society details updated successfully!!!",
    society
  };
  return;
};

exports.deleteSociety = async (ctx) => {
  const SocietyCollection = ctx.db.collection("societies");

  const society = await SocietyCollection.findOneAndDelete({ _id });

  if (!society) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Society details not found." };
  }

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Society details deleted successfully."
  };
  return;
};
