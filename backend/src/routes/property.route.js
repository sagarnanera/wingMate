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
const staticValidate = require("../middlewares/staticValidate.middleware");
const { nameValidator } = require("../validators/user.validator");
const { wingIdValidator } = require("../validators/wing.validator");
const {
  locationValidator,
  areaValidator
} = require("../validators/society.validator");
const dbValidate = require("../middlewares/dbValidate.middleware");
const { wingExistValidator } = require("../validators/db.validator");
const router = new KoaRouter({ prefix: "/api/v1/property" });

router.post(
  "/",
  authenticate([ROLES.SECRETORY]),
  staticValidate([
    nameValidator,
    wingIdValidator,
    locationValidator,
    areaValidator
  ]),
  dbValidate([wingExistValidator]),
  addProperty
);
router.get("/", authenticate(AllRoles), getProperties);
router.get("/:propertyId", authenticate(AllRoles), getProperty);
router.put(
  "/:propertyId",
  authenticate([ROLES.SECRETORY]),
  staticValidate([
    nameValidator,
    locationValidator,
    areaValidator,
    wingIdValidator
  ]),
  dbValidate([wingExistValidator]),
  updateProperty
);
router.delete("/:propertyId", authenticate([ROLES.SECRETORY]), deleteProperty);

module.exports = router;
