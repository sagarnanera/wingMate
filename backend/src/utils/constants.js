const ROLES = {
  SECRETORY: "secretory",
  WING_ADMIN: "wing admin",
  HOUSE_OWNER: "house owner",
  STD_USER: "standard user"
};

const AllRoles = [
  ROLES.SECRETORY,
  ROLES.WING_ADMIN,
  ROLES.HOUSE_OWNER,
  ROLES.STD_USER
];

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

const HOST = process.env.HOST;

module.exports = {
  ROLES,
  AllRoles,
  POST_TYPE,
  AUDIENCE_TYPE,
  HOST
};
