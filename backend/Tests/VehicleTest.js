const request = require("supertest");
const app = require("../server");
const Vehicle = require("../Model/Vehicle");
const Booking = require("../Model/Booking");
// Mock data
const mockVehicle = { name: "Test Truck", capacityKg: 1000, tyres: 6 };
describe("Vehicle API", () => {
  beforeEach(async () => {
    // Clear database before each test
    await Vehicle.deleteMany({});
    await Booking.deleteMany({});
  });
  describe("POST /api/vehicles", () => {
    it("should create a new vehicle", async () => {
      const response = await request(app)
        .post("/api/vehicles")
        .send(mockVehicle)
        .expect(201);
      expect(response.body.name).toBe(mockVehicle.name);
      expect(response.body.capacityKg).toBe(mockVehicle.capacityKg);
      expect(response.body.tyres).toBe(mockVehicle.tyres);
    });
    it("should return error for missing required fields", async () => {
      const response = await request(app)
        .post("/api/vehicles")
        .send({ name: "Test Truck" })
        .expect(400);
      expect(response.body.error).toBeDefined();
    });
  });
  describe("GET /api/vehicles/available", () => {
    it("should find available vehicles", async () => {
      // Create a vehicle first
      const vehicle = await Vehicle.create(mockVehicle);
      const queryParams = {
        capacityRequired: 500,
        fromPincode: "100001",
        toPincode: "100020",
        startTime: new Date().toISOString(),
      };
      const response = await request(app)
        .get("/api/vehicles/available")
        .query(queryParams)
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]._id).toBe(vehicle._id.toString());
    });
    it("should return empty array when no vehicles available", async () => {
      const queryParams = {
        capacityRequired: 2000,
        // Higher than any vehicle capacity
        fromPincode: "100001",
        toPincode: "100020",
        startTime: new Date().toISOString(),
      };
      const response = await request(app)
        .get("/api/vehicles/available")
        .query(queryParams)
        .expect(200);
      expect(response.body.length).toBe(0);
    });
  });
});
