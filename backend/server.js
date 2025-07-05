const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const datasetRoutes = require("./routes/datasetRoutes");

dotenv.config();
const app = express();

// Use /tmp for uploads in Vercel serverless environment
const uploadDir = process.env.NODE_ENV === "production" ? "/tmp" : path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 'Uploads/' directory created at:", uploadDir);
}

// Configure CORS with dynamic origin (allow Vercel frontend URL and dev ports)
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
      ].filter(Boolean); // Filter out empty strings
      console.log("Request origin:", origin, "Allowed origins:", allowedOrigins);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/uploads", express.static(uploadDir)); // Serve files from /tmp in production
app.use("/api/dataset", datasetRoutes);

mongoose
  .connect(process.env.MONGO_URI, { dbName: "hackathon" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app; // Export for Vercel
