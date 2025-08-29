import React, { useState } from "react";
const BookingForm = ({ vehicle, onSubmit, onCancel }) => {
  const [customerId, setCustomerId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(customerId);
  };
  return (
    <div className="booking-form-overlay">
      {" "}
      <div className="booking-form">
        {" "}
        <h3>Book Vehicle: {vehicle.name}</h3>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div>
            {" "}
            <label>Customer ID:</label>{" "}
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            />{" "}
          </div>{" "}
          <div className="form-actions">
            {" "}
            <button type="button" onClick={onCancel}>
              Cancel
            </button>{" "}
            <button type="submit">Confirm Booking</button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
export default BookingForm;
