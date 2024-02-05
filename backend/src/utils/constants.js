const ROLES = {
  SECRETORY: "secretory",
  WING_ADMIN: "wing admin",
  HOUSE_OWNER: "house owner",
  RESIDENT: "resident"
};

const AllRoles = [
  ROLES.SECRETORY,
  ROLES.WING_ADMIN,
  ROLES.HOUSE_OWNER,
  ROLES.STD_USER
];

const EVENT_STATUS = {
  PENDING: "pending approval",
  APPROVED: "approved",
  FINISHED: "finished"
};

const POST_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  GIF: "gif"
};

const AUDIENCE_TYPE = {
  SOCIETY: "society",
  WING: "wing"
};

const PROPERTY_TYPE = AUDIENCE_TYPE;

const HOST = process.env.HOST;

module.exports = {
  ROLES,
  AllRoles,
  POST_TYPE,
  AUDIENCE_TYPE,
  PROPERTY_TYPE,
  HOST,
  EVENT_STATUS
};
