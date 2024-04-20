// misc route, for miscellaneous routes

const KoaRouter = require("koa-router");
const authenticate = require("../middlewares/auth.middleware");

const {  AllRoles } = require("../utils/constants");
const { mediaUpload } = require("../controllers/misc.controller");

const router = new KoaRouter({ prefix: "/api/v1/misc" });

router.get("/media-upload", authenticate(AllRoles), mediaUpload);

module.exports = router;
