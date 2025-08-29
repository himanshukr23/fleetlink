import React, { useState } from "react";
import BookingForm from "./BookingForm";
import { bookingAPI } from "../Services/api";
const VehicleList = ({ vehicles, searchData, onBookingSuccess }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const handleBookNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setBookingMessage("");
    setBookingError("");
  };
  const handleBookingSubmit = async (customerId) => {
    try {
      const bookingData = {
        vehicleId: selectedVehicle._id,
        customerId,
        fromPincode: searchData.fromPincode,
        toPincode: searchData.toPincode,
        startTime: searchData.startTime.toISOString(),
      };
      const response = await bookingAPI.createBooking(bookingData);
      setBookingMessage("Booking confirmed successfully!");
      setSelectedVehicle(null);
      onBookingSuccess();
    } catch (err) {
      setBookingError(err.response?.data?.error || "Failed to create booking");
    }
  };
  if (vehicles.length === 0) {
    return <div>No vehicles available for the selected criteria.</div>;
  }
  return (
    <div>
      {" "}
      <h3>Available Vehicles</h3>{" "}
      {bookingMessage && <div className="success">{bookingMessage}</div>}{" "}
      {bookingError && <div className="error">{bookingError}</div>}{" "}
      <div className="vehicle-list">
        {" "}
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="vehicle-card">
            {" "}
            <h4>{vehicle.name}</h4> <p>Capacity: {vehicle.capacityKg} KG</p>{" "}
            <p>Tyres: {vehicle.tyres}</p>{" "}
            <p>
              Estimated Ride Duration: {vehicle.estimatedRideDurationHours}{" "}
              hours
            </p>{" "}
            <button onClick={() => handleBookNow(vehicle)}>Book Now</button>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {selectedVehicle && (
        <BookingForm
          vehicle={selectedVehicle}
          onSubmit={handleBookingSubmit}
          onCancel={() => setSelectedVehicle(null)}
        />
      )}{" "}
    </div>
  );
};
export default VehicleList;

