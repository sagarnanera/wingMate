const node_env = process.env.NODE_ENV;

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
};

if (node_env === "PROD") {
  Object.assign(cookieOptions, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
}

module.exports = cookieOptions;
