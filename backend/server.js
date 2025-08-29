const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const vehicleRoutes = require("./Routes/VehicleRoute");
const bookingRoutes = require("./Routes/BookingRoute");
const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

//   Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

//    Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

//    Connect to MongoDB

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
