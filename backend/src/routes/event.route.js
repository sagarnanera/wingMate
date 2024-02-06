const KoaRouter = require("koa-router");
const {
  createEvent,
  getEvents,
  changeEventStatus,
  getEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/event.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const router = new KoaRouter({ prefix: "/api/v1/event" });

router.post("/", authenticate(AllRoles), createEvent);
router.get("/", authenticate(AllRoles), getEvents);
router.get("/:eventId", authenticate(AllRoles), getEvent);
router.patch("/:eventId", authenticate([ROLES.SECRETORY]), changeEventStatus);
router.put("/:eventId", authenticate(AllRoles), updateEvent);
router.delete("/:eventId", authenticate(AllRoles), deleteEvent);

module.exports = router;
