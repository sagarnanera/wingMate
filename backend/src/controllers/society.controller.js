const { Promise } = require("bluebird");
const {
  insertSociety,
  findSociety,
  deleteSocietyData,
  updateSocietyData
} = require("../DB/society.db");
const { insertUser, insertUsers } = require("../DB/user.db");
const { genJWTToken } = require("../services/jwt.service");
const { hashPassword } = require("../services/password.service");
const { ROLES } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");

exports.societyRegistration = async (ctx) => {
  const { societyName, location, area, email, name, password, contact } =
    ctx.request.body;

  const _id = generateUUID();
  const secretoryId = generateUUID();

  const hash = await hashPassword(password);

  const secretory = insertUser(ctx.db, {
    _id: secretoryId,
    name,
    email,
    password: hash,
    societyId: _id,
    totalPost: 0,
    contact,
    role: ROLES.SECRETORY
  });

  const society = insertSociety(ctx.db, {
    _id,
    name: societyName,
    location,
    area,
    secretoryId,
    totalHouse: 0,
    totalWings: 0,
    totalProperties: 0
  });

  const promise = await Promise.all([secretory, society]);

  const payload = {
    _id: secretoryId
  };

  const token = genJWTToken(payload);

  console.log("promise", promise);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Society registered successfully!!!",
    user: { name, email, contact, societyId: _id, _id: secretoryId, token },
    society: {
      _id,
      societyName,
      location,
      area,
      secretoryId
    }
  };
  return;
};

exports.getSocietyDetails = async (ctx) => {
  const society = ctx.request.society;

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Society details fetched successfully!!!",
    society: society
  };
  return;
};

exports.addResidents = async (ctx) => {
  const { societyId } = ctx.request.user;
  const { residents } = ctx.request.body;

  // const society = await SocietyCollection.findOne({
  // const society = await findSociety({
  //   _id: societyId,
  //   secretoryId: _id
  // });

  // if (!society) {
  //   ctx.status = 404;
  //   ctx.body = { success: false, message: "Society details not found." };
  //   return;
  // }

  //TODO: send invitation mail to residents with register link - send jwt with societyId + userEmail

  const invitationLinks = [];
  const userData = [];

  residents.forEach((email) => {
    console.log("user in bulk list", email);

    const _id = generateUUID();
    const invitationToken = genJWTToken({
      societyId,
      _id: _id
    });

    userData.push({
      email,
      _id,
      societyId,
      invitationToken: invitationToken
    });

    invitationLinks.push(
      `http://localhost:8080/api/v1/auth/register?invitationToken=${invitationToken}`
    );
  });

  await insertUsers(ctx.db, userData);

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Invitation mail sent successfully to residents!!!",
    invitationLinks,
    userData
  };
  return;
};

exports.updateSocietyDetails = async (ctx) => {
  const { area, societyName, location } = ctx.request.body;
  const { societyId } = ctx.request.user;

  const societyData = { area, name: societyName, location };

  const society = await updateSocietyData(
    ctx.db,
    { _id: societyId },
    societyData
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
  const { societyId, _id } = ctx.request.user;

  const society = await deleteSocietyData(ctx.db, {
    _id: societyId,
    secretoryId: _id
  });

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
