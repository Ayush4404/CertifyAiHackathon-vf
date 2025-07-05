const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cid: { type: String, required: true },
  fileHash: String,
  description: String, // ✅ add this line
  proof: String,
  isCertified: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Dataset", datasetSchema);
