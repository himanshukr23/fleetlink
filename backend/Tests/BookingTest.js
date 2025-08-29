const request = require("supertest");
const app = require("../server");
const Vehicle = require("../Model/Vehicle");
const Booking = require("../Model/Booking");

// Mock data
const mockVehicle = { name: "Test Truck", capacityKg: 1000, tyres: 6 };
const mockBooking = {
  customerId: "test-customer-123",
  fromPincode: "100001",
  toPincode: "100020",
  startTime: new Date().toISOString(),
};

describe("Booking API", () => {
  let vehicleId;

  beforeEach(async () => {
    // Clear database and create a test vehicle
    await Vehicle.deleteMany({});
    await Booking.deleteMany({});
    const vehicle = await Vehicle.create(mockVehicle);
    vehicleId = vehicle._id.toString();
  });

  describe("POST /api/bookings", () => {
    it("should create a new booking", async () => {
      const response = await request(app)
        .post("/api/bookings")
        .send({ ...mockBooking, vehicleId })
        .expect(201);
      expect(response.body.vehicleId._id).toBe(vehicleId);
      expect(response.body.customerId).toBe(mockBooking.customerId);
      expect(response.body.status).toBe("confirmed");
    });

    it("should return conflict for overlapping bookings", async () => {
      // Create first booking
      await request(app)
        .post("/api/bookings")
        .send({ ...mockBooking, vehicleId })
        .expect(201);

      // Try to create overlapping booking
      const response = await request(app)
        .post("/api/bookings")
        .send({ ...mockBooking, vehicleId })
        .expect(409);
      expect(response.body.error).toContain("already booked");
    });

    it("should return not found for non-existent vehicle", async () => {
      const response = await request(app)
        .post("/api/bookings")
        .send({ ...mockBooking, vehicleId: "507f1f77bcf86cd799439011" }) // Random ObjectId
        .expect(404);
      expect(response.body.error).toContain("not found");
    });
  });
});