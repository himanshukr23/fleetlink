const express = require("express");
const router = express.Router();
const {
  addVehicle,
  findAvailableVehicles,
} = require("../Controller/VehicleController");
// POST /api/vehicles - Add a new vehicle
router.post("/", addVehicle);
// GET /api/vehicles/available - Find available vehicles
router.get("/available", findAvailableVehicles);
module.exports = router;
