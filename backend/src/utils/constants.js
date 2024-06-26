const ROLES = {
  SECRETORY: "secretory",
  WING_ADMIN: "wing admin",
  HOUSE_OWNER: "house owner",
  RESIDENT: "resident",
};

const AllRoles = [
  ROLES.SECRETORY,
  ROLES.WING_ADMIN,
  ROLES.HOUSE_OWNER,
  ROLES.RESIDENT,
];

const EVENT_STATUS = {
  PENDING: "pending approval",
  APPROVED: "approved",
  REJECTED: "rejected",
  FINISHED: "finished",
};

const BOOKING_TYPE = {
  PERSONAL: "personal",
  EVENT: "event",
};

const POST_CONTENT_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  GIF: "gif",
};
const POST_TYPE = {
  NORMAL_POST: "normal post",
  EVENT_POST: "event post",
};

const FEED_TYPE = {
  SOCIETY: "society",
  WING: "wing",
};

const PROPERTY_TYPE = FEED_TYPE;

const HOST = process.env.HOST;
const FRONTEND_HOST = process.env.FRONTEND_URL;

const CLOUDINARY_CONFIG = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

const MAIL_CONFIG = {
  USER: process.env.MAILER,
  PASS: process.env.MAILER_PASS,
};

module.exports = {
  ROLES,
  AllRoles,
  POST_TYPE,
  POST_CONTENT_TYPE,
  FEED_TYPE,
  BOOKING_TYPE,
  PROPERTY_TYPE,
  HOST,
  EVENT_STATUS,
  CLOUDINARY_CONFIG,
  MAIL_CONFIG,
  FRONTEND_HOST,
};
