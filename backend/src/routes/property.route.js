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
const {
  rentValidator,
  propertyIdValidator
} = require("../validators/property.validator");
const { propertyIdsValidator } = require("../validators/booking.validator");
const {
  skipValidator,
  limitValidator
} = require("../validators/common.validator");
const router = new KoaRouter({ prefix: "/api/v1/property" });

router.post(
  "/",
  authenticate([ROLES.SECRETORY]),
  staticValidate([
    nameValidator,
    locationValidator,
    areaValidator,
    wingIdValidator,
    rentValidator
  ]),
  dbValidate([wingExistValidator]),
  addProperty
);
router.get(
  "/",
  authenticate(AllRoles),
  staticValidate([skipValidator, limitValidator]),
  getProperties
);

router.get(
  "/:propertyId",
  authenticate(AllRoles),
  staticValidate([propertyIdValidator]),
  getProperty
);

router.put(
  "/:propertyId",
  authenticate([ROLES.SECRETORY]),
  staticValidate([
    propertyIdValidator,
    nameValidator,
    locationValidator,
    areaValidator,
    wingIdValidator,
    rentValidator
  ]),
  dbValidate([wingExistValidator]),
  updateProperty
);
router.delete(
  "/:propertyId",
  authenticate([ROLES.SECRETORY]),
  staticValidate([propertyIdValidator]),
  deleteProperty
);

module.exports = router;
