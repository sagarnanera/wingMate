const joi = require("joi");

exports.emailValidator = (ctx) => {
  let { email } = ctx.request.body;

  if (!email || email === "") {
    return { field: "email", message: "Email is required" };
  }

  email = email.trim();

  const { error } = joi.string().email().required().validate(email);

  if (error) {
    return { field: "email", message: "Email is not valid" };
  }

  ctx.request.body.email = email;

  return null;
};

exports.nameValidator = (ctx) => {
  let { name } = ctx.request.body;

  if (!name || name === "") {
    return { field: "name", message: "Name is required" };
  }

  name = name.trim();

  const { error } = joi.string().min(3).max(20).required().validate(name);
  if (error) {
    return {
      field: "name",
      message: "Name should be between 3 and 20 characters long"
    };
  }

  ctx.request.body.name = name;

  return null;
};

exports.passwordValidator = (ctx) => {
  const { password } = ctx.request.body;

  if (!password) {
    return { field: "password", message: "Password is required" };
  }

  const { error } = joi.string().min(6).required().validate(password);
  if (error) {
    return {
      field: "password",
      message: "Password should be at least 6 characters long"
    };
  }

  return null;
};

exports.contactValidator = (ctx) => {
  const { contact } = ctx.request.body;

  if (!contact) {
    return { field: "contact", message: "Contact is required" };
  }

  const { error } = joi
    .string()
    .pattern(/^[\d]{10}$/)
    .required()
    .validate(contact);
  if (error) {
    console.log(error, 38);
    return {
      field: "contact",
      message: "Contact should be a 10-digit number"
    };
  }

  return null;
};

exports.resetTokenValidator = (ctx) => {
  const { token } = ctx.params;

  if (!token) {
    return { field: "token", message: "reset password token is required" };
  }

  const { error } = joi.string().uuid().required().validate(token);

  if (error) {
    console.log(error, 38);
    return {
      field: "token",
      message: "Reset password token is not valid"
    };
  }

  return null;
};

exports.userIdValidator = (ctx) => {
  // if (!userId) {
  //   return { field: "userId", message: "UserId is required." };
  // }

  const { method: requestMethod } = ctx.request;
  let { userId } = ctx.request.body;

  if (requestMethod === "GET") {
    userId = ctx.query?.userId;
  }

  if (requestMethod !== "GET" && !userId) {
    return { field: "userId", message: "User ID is required" };
  }

  if (userId) {
    const { error } = joi.string().uuid().required().validate(userId);
    if (error) {
      return { field: "userId", message: "User ID must be a valid UUID" };
    }
  }

  return null;
};

// const loginValidator = joi.object({
//   email: joi.string().email().required(),
//   password: joi.string().required()
// });

// const userValidator = joi.object({
//   name: joi.string().min(3).max(20).required(),
//   password: joi.string().required(),
//   wingId: joi.string().uuid().required(),
//   contact: joi.string().pattern().required()
// });

// exports.nameValidator
