const express = require("express");
const router = express.Router();
const {
  addVehicle,
  findAvailableVehicles,
  getAllVehicles,
} = require("../Controller/VehicleController");

// POST /api/vehicles - Add a new vehicle
router.post("/", addVehicle);

// GET /api/vehicles/available - Find available vehicles
router.get("/available", findAvailableVehicles);

// GET /api/vehicles - Get all vehicles
router.get("/", getAllVehicles);

module.exports = router;