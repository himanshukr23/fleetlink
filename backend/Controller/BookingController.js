const Booking = require("../Model/Booking");
const Vehicle = require("../Model/Vehicle");
const { calculateRideDuration } = require("./VehicleController");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, customerId, fromPincode, toPincode, startTime } =
      req.body;
    // Validate required fields
    if (!vehicleId || !customerId || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const startTimeDate = new Date(startTime);
    if (isNaN(startTimeDate.getTime())) {
      return res.status(400).json({ error: "Invalid startTime format" });
    }

    // Check if vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    // Calculate ride duration and end time
    const estimatedRideDurationHours = calculateRideDuration(
      fromPincode,
      toPincode
    );
    const endTime = new Date(
      startTimeDate.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
    );
    // Check for overlapping bookings (race condition prevention)
    const overlappingBookings = await Booking.find({
      vehicleId,
      status: "confirmed",
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTimeDate } }],
    });
    if (overlappingBookings.length > 0) {
      return res
        .status(409)
        .json({
          error: "Vehicle is already booked for the requested time slot",
        });
    }
    // Create booking
    const booking = new Booking({
      vehicleId,
      customerId,
      fromPincode,
      toPincode,
      startTime: startTimeDate,
      endTime,
      estimatedRideDurationHours,
    });
    await booking.save();
    // Populate vehicle details in response
    await booking.populate("vehicleId");
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("vehicleId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
