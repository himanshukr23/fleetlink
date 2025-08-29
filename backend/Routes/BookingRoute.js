const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  cancelBooking,
} = require("../Controller/BookingController");
// POST /api/bookings - Create a new booking
router.post("/", createBooking);
// GET /api/bookings - Get all bookings
router.get("/", getBookings);
// DELETE /api/bookings/:id - Cancel a booking
router.delete("/:id", cancelBooking);
module.exports = router;
