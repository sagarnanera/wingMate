const KoaRouter = require("koa-router");
const {
  getBooking,
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getUnbookedProperties
} = require("../controllers/booking.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const {
  isBookedValidator,
  propertiesExistValidator,
  isBookingExistValidator
} = require("../validators/db.validator");
const staticValidate = require("../middlewares/staticValidate.middleware");
const dbValidate = require("../middlewares/dbValidate.middleware");
const {
  propertyIdsValidator,
  startDateValidator,
  endDateValidator,
  reasonValidator,
  bookingIdValidator
} = require("../validators/booking.validator");
const router = new KoaRouter({ prefix: "/api/v1/booking" });

router.post(
  "/",
  authenticate(AllRoles),
  staticValidate([
    reasonValidator,
    propertyIdsValidator,
    startDateValidator,
    endDateValidator
  ]),
  dbValidate([propertiesExistValidator, isBookedValidator]),
  createBooking
);

router.get("/", authenticate(AllRoles), getBookings);

router.get(
  "/unbooked",
  authenticate(AllRoles),
  staticValidate([startDateValidator, endDateValidator]),
  getUnbookedProperties
);

router.get(
  "/:bookingId",
  authenticate(AllRoles),
  staticValidate([bookingIdValidator]),
  getBooking
);

router.put(
  "/:bookingId",
  authenticate(AllRoles),
  staticValidate([bookingIdValidator, startDateValidator, endDateValidator]),
  dbValidate([isBookingExistValidator, isBookedValidator]),
  updateBooking
);

router.delete(
  "/:bookingId",
  authenticate(AllRoles),
  staticValidate([bookingIdValidator]),
  deleteBooking
);

module.exports = router;
