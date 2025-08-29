import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Vehicle API calls
export const vehicleAPI = {
  addVehicle: (vehicleData) => api.post("/vehicles", vehicleData),
  getAvailableVehicles: (params) => api.get("/vehicles/available", { params }),
  getAllVehicles: () => api.get("/vehicles"),
};

// Booking API calls
export const bookingAPI = {
  createBooking: (bookingData) => api.post("/bookings", bookingData),
  getBookings: () => api.get("/bookings"),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
};

export default api;