import React, { useState, useEffect } from "react";
import { bookingAPI } from "../Services/api";
import "../Styles/App.css";

const BookedVehicles = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingAPI.getBookings();
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No vehicles have been booked yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vehicle Name</th>
              <th>Customer ID</th>
              <th>From Pincode</th>
              <th>To Pincode</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.vehicleId.name}</td>
                <td>{booking.customerId}</td>
                <td>{booking.fromPincode}</td>
                <td>{booking.toPincode}</td>
                <td>{new Date(booking.startTime).toLocaleString()}</td>
                <td>{new Date(booking.endTime).toLocaleString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookedVehicles;