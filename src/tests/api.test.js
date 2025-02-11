const request = require("supertest");
const app = require("../app"); // ✅ Import the app without starting the server

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

