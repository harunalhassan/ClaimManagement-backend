const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const client = require("prom-client"); // Prometheus client for metrics

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://harunalhassan10:Z8q9GH5sOkL2WnfU@claimdbs.pdtfx.mongodb.net/?retryWrites=true&w=majority&appName=claimdbs";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// -------------------- Prometheus Monitoring --------------------
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});
register.registerMetric(httpRequestCounter);

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});
register.registerMetric(httpRequestDuration);

app.use((req, res, next) => {
  const start = Date.now();
  
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestCounter.inc({ method: req.method, route: req.baseUrl, status: res.statusCode });
    httpRequestDuration.observe({ method: req.method, route: req.baseUrl, status: res.statusCode }, duration);
  });

  next();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// -------------------- API Routes --------------------
const claimRoutes = require("./routes/claimRoutes");
const policyRoutes = require("./routes/policyRoutes");
const policyholderRoutes = require("./routes/policyholderRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api", claimRoutes);
app.use("/api", policyRoutes);
app.use("/api", policyholderRoutes);
app.use("/api", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("The Claim Management System is running!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// -------------------- Export App & Start Server --------------------
const PORT = process.env.PORT || 8000;

// **Only start the server if the file is run directly**
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // ✅ Export the app for testing
