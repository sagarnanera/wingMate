const KoaRouter = require("koa-router");
const {
  societyRegistration,
  getSocietyDetails,
  updateSocietyDetails,
  deleteSociety,
  addResidents
} = require("../controllers/society.controller");
const authenticate = require("../middlewares/auth.middleware");
const { ROLES, AllRoles } = require("../utils/constants");
const staticValidate = require("../middlewares/staticValidate.middleware");
const {
  societyNameValidator,
  areaValidator,
  locationValidator,
  residentsValidator
} = require("../validators/society.validator");
const {
  nameValidator,
  emailValidator,
  passwordValidator,
  contactValidator
} = require("../validators/user.validator");
const {
  isEmailExistValidator,
  isEmailExistBulkValidator,
  societyExistValidator
} = require("../validators/db.validator");
const dbValidate = require("../middlewares/dbValidate.middleware");
const router = new KoaRouter({ prefix: "/api/v1/society" });

router.post(
  "/register",
  staticValidate([
    nameValidator,
    emailValidator,
    passwordValidator,
    contactValidator,
    societyNameValidator,
    areaValidator,
    locationValidator
  ]),
  dbValidate([isEmailExistValidator]),
  societyRegistration
);

router.post(
  "/residents",
  authenticate([ROLES.SECRETORY]),
  staticValidate([residentsValidator]),
  dbValidate([societyExistValidator, isEmailExistBulkValidator]),
  addResidents
);
router.get(
  "/",
  authenticate(AllRoles),
  dbValidate([societyExistValidator]),
  getSocietyDetails
);
router.put(
  "/",
  authenticate([ROLES.SECRETORY]),
  staticValidate([societyNameValidator, areaValidator, locationValidator]),
  updateSocietyDetails
);
router.delete("/", authenticate([ROLES.SECRETORY]), deleteSociety);

module.exports = router;
