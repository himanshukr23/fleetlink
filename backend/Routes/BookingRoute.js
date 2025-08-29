const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/BookingController");

// GET /api/bookings - Get all bookings
router.get("/", bookingController.getAllBookings);

// POST /api/bookings - Create a new booking
router.post("/", bookingController.createBooking);

// DELETE /api/bookings/:id - Cancel a booking
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;