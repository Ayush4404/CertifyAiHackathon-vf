// backend/utils/pinataUpload.js
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function uploadToPinata(filePath, fileName) {
  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath), fileName);

    console.log("Pinata API Key:", process.env.PINATA_API_KEY); // Debug
    console.log("Pinata Secret Key:", process.env.PINATA_SECRET_API_KEY ? "****" : "Missing"); // Debug
    const response = await axios.post(url, formData, {
      maxContentLength: Infinity,
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    });

    if (!response.data.IpfsHash) {
      throw new Error("Pinata response missing IpfsHash");
    }

    return { cid: response.data.IpfsHash };
  } catch (err) {
    throw new Error(`Pinata upload failed: ${err.response?.data?.error?.details || err.message}`);
  }
}

module.exports = { uploadToPinata };