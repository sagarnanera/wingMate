const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  // domain: "localhost",
  // secure: false,
  // httpOnly: true,
  // sameSite: "none"
};

module.exports = cookieOptions;
