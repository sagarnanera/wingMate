const KoaRouter = require("koa-router");
const {
  getEventDetails,
  createEvent,
  getEvents,
  updateEventDetails,
  deleteEvent
} = require("../controllers/event.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const router = new KoaRouter({ prefix: "/api/v1/event" });

router.post("/", authenticate(AllRoles), createEvent);
router.get("/", authenticate(AllRoles), getEvents);
router.get("/:eventId", authenticate(AllRoles), getEventDetails);
router.put("/:eventId", authenticate(AllRoles), updateEventDetails);
router.delete("/:eventId", authenticate(AllRoles), deleteEvent);

module.exports = router;
