const KoaRouter = require("koa-router");
const {
  addWing,
  getWings,
  getWingDetails,
  updateWingDetails,
  deleteWingDetails
} = require("../controllers/wing.controller.js");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const router = new KoaRouter({ prefix: "/api/v1/wing" });

router.post("/", authenticate([ROLES.SECRETORY]), addWing);
router.get("/", authenticate(AllRoles), getWings);
router.get("/:wingId", authenticate(AllRoles), getWingDetails);
router.put(
  "/:wingId",
  authenticate([ROLES.SECRETORY, ROLES.WING_ADMIN]),
  updateWingDetails
);
router.delete(
  "/:wingId",
  authenticate([ROLES.SECRETORY, ROLES.WING_ADMIN]),
  deleteWingDetails
);

module.exports = router;
