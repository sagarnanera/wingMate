const KoaRouter = require("koa-router");
const {
  loginController,
  registerController,
  logoutController
} = require("../controllers/auth.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const router = new KoaRouter({ prefix: "/api/v1/auth" });

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", authenticate(AllRoles), logoutController);

module.exports = router;
