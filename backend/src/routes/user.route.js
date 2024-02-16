const KoaRouter = require("koa-router");
const {
  getUser,
  getAllUsers,
  updateUseRole,
  updatePassword,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");
const authenticate = require("../middlewares/auth.middleware");
const staticValidate = require("../middlewares/staticValidate.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const {
  emailValidator,
  nameValidator,
  contactValidator,
  passwordValidator,
  userRoleValidator
} = require("../validators/user.validator");
const { wingIdValidator } = require("../validators/wing.validator");
const dbValidate = require("../middlewares/dbValidate.middleware");
const { wingExistValidator } = require("../validators/db.validator");
const { societyIdValidator } = require("../validators/society.validator");
const {
  skipValidator,
  limitValidator
} = require("../validators/common.validator");
const router = new KoaRouter({ prefix: "/api/v1/user" });

router.get("/", authenticate(AllRoles), getUser);

router.put(
  "/",
  authenticate(AllRoles),
  staticValidate([
    nameValidator,
    emailValidator,
    contactValidator,
    wingIdValidator
  ]),
  dbValidate([wingExistValidator]),
  updateUser
);

router.delete("/", authenticate(AllRoles), deleteUser);

router.post(
  "/update-password",
  authenticate(AllRoles),
  staticValidate([passwordValidator]),
  updatePassword
);

// admin routes
router.get(
  "/users",
  authenticate([ROLES.SECRETORY, ROLES.WING_ADMIN]),
  staticValidate([skipValidator, limitValidator]),
  getAllUsers
);

router.post(
  "/role",
  authenticate([ROLES.SECRETORY]),
  staticValidate([userRoleValidator]),
  updateUseRole
);

module.exports = router;
