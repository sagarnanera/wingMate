const { Promise } = require("bluebird");
const {
  insertSociety,
  findSociety,
  deleteSocietyData,
  updateSocietyData,
} = require("../DB/society.db");
const { insertUser, insertUsers } = require("../DB/user.db");
const { genJWTToken } = require("../services/jwt.service");
const { hashPassword } = require("../services/password.service");
const { ROLES, HOST, FRONTEND_HOST } = require("../utils/constants");
const generateUUID = require("../utils/generateUUID");
const { responseHandler } = require("../handlers/response.handler");
const sendMail = require("../services/mail.service");
const cookieOptions = require("../config/cookie.config");

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
    role: ROLES.SECRETORY,
  });

  const society = insertSociety(ctx.db, {
    _id,
    name: societyName,
    location,
    area,
    secretoryId,
    totalHouse: 0,
    totalWings: 0,
    totalProperties: 0,
  });

  await Promise.all([secretory, society]);

  const payload = {
    _id: secretoryId,
  };

  const token = genJWTToken(payload);

  ctx.cookies.set("token", token, cookieOptions);

  responseHandler(
    ctx,
    true,
    "Society registered successfully!!!",
    201,
    {
      user: {
        name,
        email,
        contact,
        societyId: _id,
        role: ROLES.SECRETORY,
        _id: secretoryId,
        token,
      },
      society: {
        _id,
        name: societyName,
        location,
        area,
        secretoryId,
      },
    },
    "Society registered : "
  );
  return;
};

exports.getSocietyDetails = async (ctx) => {
  const society = ctx.request.society;

  responseHandler(
    ctx,
    true,
    "Society details fetched successfully!!!",
    200,
    { society },
    "Society details fetched : "
  );
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
    const _id = generateUUID();
    const invitationToken = genJWTToken({
      societyId,
      _id: _id,
    });

    userData.push({
      email,
      _id,
      societyId,
      invitationToken: invitationToken,
    });

    invitationLinks.push(
      `${FRONTEND_HOST}/register?invitationToken=${invitationToken}`
    );
  });

  await insertUsers(ctx.db, userData);
  // send mail to residents //TODO: this is not the correct way to send mail, use a queue system
  userData.forEach((user) => {
    sendMail(
      user.email,
      "Invitation to join society",
      "Please click on the below link to register",
      `Please click on the below link to register <a href="${invitationLinks}">Register</a>`
    );
  });

  responseHandler(
    ctx,
    true,
    "Invitation mail sent successfully to residents!!!",
    200,
    { invitationLinks, userData },
    "invitation to residents : "
  );

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
    responseHandler(
      ctx,
      false,
      "Society details not found.",
      404,
      null,
      "Society not found in update :"
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "Society details updated successfully!!!",
    200,
    { society },
    "Society updated : "
  );
  return;
};

exports.deleteSociety = async (ctx) => {
  const { societyId, _id } = ctx.request.user;

  const society = await deleteSocietyData(ctx.db, {
    _id: societyId,
    secretoryId: _id,
  });

  if (!society) {
    responseHandler(
      ctx,
      false,
      "Society details not found.",
      404,
      null,
      "Society not found in delete :"
    );

    return;
  }

  responseHandler(
    ctx,
    true,
    "Society details deleted successfully.",
    200,
    null,
    "Society deleted : "
  );

  // TODO : delete all residents, wings, properties, post etc........

  return;
};
