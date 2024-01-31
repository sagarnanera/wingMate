const { v4: uuid } = require("uuid");

const generateUUID = () => {
  return uuid();
};

module.exports = generateUUID;
