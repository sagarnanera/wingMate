const jwt = require("jsonwebtoken");

const JWT_SEC = process.env.JWT_SECRET;
const JWT_EXP = process.env.JWT_EXPIRE;

const genJWTToken = (payload) => {
  // try {
  const token = jwt.sign(payload, JWT_SEC, {
    expiresIn: JWT_EXP
  });

  return token;
  // } catch (error) {
  //   throw error;
  // }
};

const verifyJWTToken = (token) => {
  // try {
  const payload = jwt.verify(token, JWT_SEC);
  return payload;
  // } catch (error) {
  //   throw error;
  // }
};

module.exports = { genJWTToken, verifyJWTToken };
