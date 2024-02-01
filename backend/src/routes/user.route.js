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
const { AllRoles, ROLES } = require("../utils/constants");
const router = new KoaRouter({ prefix: "/api/v1/user" });

router.get("/", authenticate(AllRoles), getUser);
router.put("/", authenticate(AllRoles), updateUser);
router.delete("/", authenticate(AllRoles), deleteUser);

router.post("/update-password", authenticate(AllRoles), updatePassword);

// admin routes
router.get(
  "/users",
  authenticate([ROLES.SECRETORY, ROLES.WING_ADMIN]),
  getAllUsers
);
router.post("/role", authenticate([ROLES.SECRETORY]), updateUseRole);

module.exports = router;
