const KoaRouter = require("koa-router");
const {
  societyRegistration,
  getSocietyDetails,
  updateSocietyDetails,
  deleteSociety,
  addResidents
} = require("../controllers/society.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const router = new KoaRouter({ prefix: "/api/v1/society" });

router.post("/register", societyRegistration);
router.post("/residents", authenticate([ROLES.SECRETORY]), addResidents);
router.get("/", authenticate([ROLES.SECRETORY]), getSocietyDetails);
router.put("/", authenticate([ROLES.SECRETORY]), updateSocietyDetails);
router.delete("/", authenticate([ROLES.SECRETORY]), deleteSociety);

module.exports = router;
