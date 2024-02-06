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
const router = new KoaRouter({ prefix: "/api/v1/booking" });

router.post("/", authenticate(AllRoles), createBooking);
router.get("/", authenticate(AllRoles), getBookings);
router.get("/unbooked", authenticate(AllRoles), getUnbookedProperties);
router.get("/:bookingId", authenticate(AllRoles), getBooking);
router.put("/:bookingId", authenticate(AllRoles), updateBooking);
router.delete("/:bookingId", authenticate(AllRoles), deleteBooking);

module.exports = router;
