const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const datasetRoutes = require("./routes/datasetRoutes");

dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();

// ✅ CORS Config: Allow Vercel Frontend + Localhost
const allowedOrigins = [
  "https://certify-ai-hackathon-vf.vercel.app",  // Your deployed frontend
  "http://localhost:5173",                      // Local dev frontend (Vite)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ✅ Create uploads folder if not exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 'Uploads/' directory created");
}

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ CertifyAI Backend is running");
});

// ✅ API routes
app.use("/api/dataset", datasetRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: "hackathon" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
