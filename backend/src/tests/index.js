const supertest = require("supertest");
require("dotenv").config();
const app = require("../app.js");
const request = supertest.agent(app.listen());
module.exports = request;
