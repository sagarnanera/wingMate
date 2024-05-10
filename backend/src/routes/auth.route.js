const KoaRouter = require("koa-router");
const {
  loginController,
  registerController,
  logoutController,
  ForgotPass,
  ResetPass,
} = require("../controllers/auth.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const staticValidate = require("../middlewares/staticValidate.middleware");
const {
  nameValidator,
  emailValidator,
  contactValidator,
  passwordValidator,
  resetTokenValidator,
} = require("../validators/user.validator");
const { wingIdValidator } = require("../validators/wing.validator");
const dbValidate = require("../middlewares/dbValidate.middleware");
const {
  resetLinkValidator,
  isUserValidValidator,
  isEmailExistValidator,
  wingExistValidator,
  societyExistValidator,
} = require("../validators/db.validator");
const { invitationTokenValidator } = require("../validators/society.validator");
const router = new KoaRouter({ prefix: "/api/v1/auth" });

router.post("/login", staticValidate([emailValidator]), loginController);
router.post(
  "/register",
  staticValidate([
    nameValidator,
    contactValidator,
    wingIdValidator,
    invitationTokenValidator,
  ]),
  dbValidate([societyExistValidator, wingExistValidator]),
  registerController
);
router.post("/logout", authenticate(AllRoles), logoutController);

router.post(
  "/forgot-password",
  staticValidate([emailValidator]),
  dbValidate([isUserValidValidator]),
  ForgotPass
);

router.post(
  "/reset-password/:token",
  staticValidate([passwordValidator, resetTokenValidator]),
  dbValidate([resetLinkValidator]),
  ResetPass
);

module.exports = router;
