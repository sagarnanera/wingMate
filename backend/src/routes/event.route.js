const KoaRouter = require("koa-router");
const {
  createEvent,
  getEvents,
  changeEventStatus,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventsAdmin
} = require("../controllers/event.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const staticValidate = require("../middlewares/staticValidate.middleware");
const {
  propertyIdsValidator,
  startDateValidator,
  endDateValidator
} = require("../validators/booking.validator");
const { nameValidator } = require("../validators/user.validator");
const {
  feesPerPersonValidator,
  eventDescriptionValidator,
  eventIdValidator,
  eventStatusValidator
} = require("../validators/event.validator");
const dbValidate = require("../middlewares/dbValidate.middleware");
const {
  propertiesExistValidator,
  isBookedValidator,
  isBookingExistValidator,
  isEventExistValidator
} = require("../validators/db.validator");
const router = new KoaRouter({ prefix: "/api/v1/event" });

router.post(
  "/",
  authenticate(AllRoles),
  staticValidate([
    nameValidator,
    eventDescriptionValidator,
    feesPerPersonValidator,
    propertyIdsValidator,
    startDateValidator,
    endDateValidator
  ]),
  dbValidate([propertiesExistValidator, isBookedValidator]),
  createEvent
);

router.get("/admin", authenticate([ROLES.SECRETORY]), getEventsAdmin);

router.get("/", authenticate(AllRoles), getEvents);

router.get(
  "/:eventId",
  authenticate(AllRoles),
  staticValidate([eventIdValidator]),
  getEvent
);

router.patch(
  "/:eventId",
  authenticate([ROLES.SECRETORY]),
  staticValidate([eventIdValidator, eventStatusValidator]),
  changeEventStatus
);

router.put(
  "/:eventId",
  authenticate(AllRoles),
  staticValidate([
    eventIdValidator,
    nameValidator,
    eventDescriptionValidator,
    feesPerPersonValidator,
    startDateValidator,
    endDateValidator
  ]),
  dbValidate([isEventExistValidator, isBookedValidator]),
  updateEvent
);

router.delete(
  "/:eventId",
  authenticate(AllRoles),
  staticValidate([eventIdValidator]),
  deleteEvent
);

module.exports = router;
