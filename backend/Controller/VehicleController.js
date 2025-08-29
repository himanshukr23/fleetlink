const Vehicle = require("../Model/Vehicle");
const Booking = require("../Model/Booking");

// Calculate estimated ride duration (simplified logic)
const calculateRideDuration = (fromPincode, toPincode) => {
  const fromNum = parseInt(fromPincode) || 0;
  const toNum = parseInt(toPincode) || 0;
  return Math.abs(toNum - fromNum) % 24;
};

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    const vehicle = new Vehicle({ name, capacityKg, tyres });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Find available vehicles
exports.findAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    // Validate required parameters
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const startTimeDate = new Date(startTime);
    if (isNaN(startTimeDate.getTime())) {
      return res.status(400).json({ error: "Invalid startTime format" });
    }

    // Calculate ride duration and end time
    const estimatedRideDurationHours = calculateRideDuration(
      fromPincode,
      toPincode
    );
    const endTime = new Date(
      startTimeDate.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
    );

    // Find vehicles with sufficient capacity
    const vehicles = await Vehicle.find({
      capacityKg: { $gte: parseInt(capacityRequired) },
      isActive: true,
    });

    // Check for overlapping bookings
    const availableVehicles = [];
    for (const vehicle of vehicles) {
      const overlappingBookings = await Booking.find({
        vehicleId: vehicle._id,
        status: "confirmed",
        $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTimeDate } }],
      });
      if (overlappingBookings.length === 0) {
        availableVehicles.push({
          ...vehicle.toObject(),
          estimatedRideDurationHours,
        });
      }
    }
    res.json(availableVehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the function so it can be used in other files
exports.calculateRideDuration = calculateRideDuration;