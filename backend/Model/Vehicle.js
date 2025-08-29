const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    capacityKg: { type: Number, required: true, min: 0 },
    tyres: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Vehicle", vehicleSchema);
