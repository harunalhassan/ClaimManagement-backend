const request = require("supertest");
const mongoose = require("mongoose"); //  Import mongoose to close the connection
const app = require("../app");

describe("API Tests", () => {
  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection after tests
  });

  describe("GET /api/policies", () => {
    it("should return all policies", async () => {
      const res = await request(app).get("/api/policies");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/claims", () => {
    it("should return all claims", async () => {
      const res = await request(app).get("/api/claims");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /api/claims", () => {
    it("should create a claim", async () => {
      const res = await request(app).get("/api/claims");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  describe("GET /api/policyholders", () => {
    it("should create a claim", async () => {
      const res = await request(app).get("/api/policyholders");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
