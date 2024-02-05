const KoaRouter = require("koa-router");
const {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  getProperty
} = require("../controllers/property.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const router = new KoaRouter({ prefix: "/api/v1/wing" });

router.post("/", authenticate([ROLES.SECRETORY]), addProperty);
router.get("/", authenticate(AllRoles), getProperties);
router.get("/:propertyId", authenticate([ROLES.SECRETORY]), getProperty);
router.put("/:propertyId", authenticate([ROLES.SECRETORY]), updateProperty);
router.delete("/:propertyId", authenticate([ROLES.SECRETORY]), deleteProperty);

module.exports = router;
