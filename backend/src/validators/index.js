const joi = require("joi");
const { ROLES } = require("../utils/constants");

const emailValidator = joi.string().email();
const passwordValidator = joi.string().min(6).required();
const nameValidator = joi.string().min(3).max(20);
const roleValidator = joi.string().valid(...Object.values(ROLES));
