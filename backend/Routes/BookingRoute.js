// const express = require("express");
// const router = express.Router();
// const {
//   createBooking,
//   getBookings,
//   cancelBooking,
// } = require("../Controller/BookingController");
// // POST /api/bookings - Create a new booking
// router.post("/", createBooking);
// // GET /api/bookings - Get all bookings
// router.get("/", getBookings);
// // DELETE /api/bookings/:id - Cancel a booking
// router.delete("/:id", cancelBooking);
// module.exports = router;

const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/BookingController");

// Add this line to handle GET requests for all bookings
router.get("/", bookingController.getAllBookings);

// Create a new booking
router.post("/", bookingController.createBooking);

// Cancel a booking
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;