const KoaRouter = require("koa-router");
const {
  loginController,
  registerController,
  logoutController
} = require("../controllers/auth.controller");
const router = new KoaRouter({ prefix: "/api/v1/auth" });

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);

module.exports = router;
