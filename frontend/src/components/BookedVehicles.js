// import React, { useState, useEffect } from "react";
// import { bookingAPI } from "../Services/api";
// import "../Styles/App.css";

// const BookedVehicles = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await bookingAPI.getBookings();
//       const validBookings = response.data.filter(
//         (booking) => booking.vehicleId
//       );
//       setBookings(validBookings);
//     } catch (err) {
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       await bookingAPI.cancelBooking(bookingId);
//       setMessage("Booking cancelled successfully!");
//       // Refresh the bookings list
//       fetchBookings();
//     } catch (err) {
//       setError("Failed to cancel booking.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <div>
//       <h2>All Bookings</h2>
//       {message && <div className="success">{message}</div>}
//       {bookings.length === 0 ? (
//         <p>No vehicles have been booked yet.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Vehicle Name</th>
//               <th>Customer ID</th>
//               <th>From Pincode</th>
//               <th>To Pincode</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.vehicleId ? booking.vehicleId.name : "Vehicle Deleted"}</td>
//                 <td>{booking.customerId}</td>
//                 <td>{booking.fromPincode}</td>
//                 <td>{booking.toPincode}</td>
//                 <td>{new Date(booking.startTime).toLocaleString()}</td>
//                 <td>{new Date(booking.endTime).toLocaleString()}</td>
//                 <td>{booking.status}</td>
//                 <td>
//                   {booking.status === "confirmed" && (
//                     <button onClick={() => handleCancelBooking(booking._id)}>
//                       Cancel
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BookedVehicles;

import React, { useState, useEffect, useCallback } from "react";
import { bookingAPI } from "../Services/api";
import { toast } from "react-toastify";
import "../Styles/App.css";

const BookedVehicles = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getBookings();
      // Filter out bookings where the associated vehicle might have been deleted
      const validBookings = response.data.filter(
        (booking) => booking.vehicleId
      );
      setBookings(validBookings);
    } catch (err) {
      // Error toast is handled by the API interceptor
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingAPI.cancelBooking(bookingId);
      toast.success("Booking cancelled successfully!");
      // Refresh the list of bookings after cancellation
      fetchBookings();
    } catch (err) {
      // Error toast is handled by the API interceptor
      console.error("Failed to cancel booking:", err);
    }
  };

  if (loading) {
    return <div>Loading bookings...</div>;
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
              <th>Action</th>
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
                <td>
                  {booking.status === "confirmed" && (
                    <button onClick={() => handleCancelBooking(booking._id)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookedVehicles;