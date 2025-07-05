const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const datasetRoutes = require("./routes/datasetRoutes");

dotenv.config({ path: path.join(__dirname, '.env') }); // Explicit path for clarity
const app = express();

// Create 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 'Uploads/' directory created");
}

// Middleware
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
//       console.log("Request origin:", origin); // Debug log
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true); // Allow if origin is undefined (e.g., same-origin) or in list
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all common methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow relevant headers
//     credentials: true, // Allow cookies if needed (optional)
//   })
// );
app.use(cors({
  origin: "https://certify-ai-hackathon-vf.vercel.app", // ✅ your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

 // Restrict to frontend origin
app.get("/", (req, res) => {
  res.send("✅ CertifyAI Backend is running");
});

// Static file server for uploaded datasets
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/dataset", datasetRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "hackathon",
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
