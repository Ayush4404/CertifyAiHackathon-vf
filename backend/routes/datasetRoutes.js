const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadToPinata } = require("../utils/pinataUpload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.NODE_ENV === "production" ? "/tmp" : "uploads/";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const dataFilePath = path.join(__dirname, "../data/datasets.json");

const readDatasets = () => {
  if (!fs.existsSync(dataFilePath)) return [];
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeDatasets = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

router.post("/upload", upload.single("dataset"), async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const file = req.file;
    if (!req.body || !req.body.name) {
      return res.status(400).json({ error: "Missing name field in form data" });
    }
    const { name, description } = req.body;

    if (!file) {
      return res.status(400).json({ error: "Missing dataset file" });
    }

    console.log("Uploading to Pinata...");
    const pintaRes = await uploadToPinata(file.path, file.originalname);
    console.log("Pinata response:", pintaRes);
    const ipfsCID = pintaRes.cid;

    const newDataset = {
      id: Date.now().toString(),
      name,
      description: description || "",
      cid: ipfsCID,
      fileName: file.filename,
      fileHash: Date.now().toString(36),
      isCertified: false,
      proof: null,
      nft: null,
      createdAt: new Date(),
    };

    console.log("Saving dataset:", newDataset);
    const datasets = readDatasets();
    datasets.push(newDataset);
    writeDatasets(datasets);

    try {
      fs.unlinkSync(file.path); // Clean up temporary file
    } catch (err) {
      console.warn("Failed to delete local file:", err.message);
    }

    console.log("Sending response:", { success: true, dataset: newDataset });
    res.status(201).json({ success: true, dataset: newDataset });
  } catch (err) {
    console.error("Upload Error:", err.message);
    res.status(500).json({ error: `Failed to upload dataset to IPFS: ${err.message}` });
  }
});

router.get("/", express.json(), (req, res) => {
  try {
    const datasets = readDatasets();
    res.json(datasets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch datasets" });
  }
});

router.post("/certify/:id", express.json(), (req, res) => {
  try {
    const datasets = readDatasets();
    const dataset = datasets.find((ds) => ds.id === req.params.id);

    if (!dataset) return res.status(404).json({ error: "Dataset not found" });

    if (dataset.isCertified) {
      return res.status(400).json({ error: "Dataset already certified" });
    }

    dataset.isCertified = true;
    dataset.proof = "dummy_zk_proof_hash_" + Date.now().toString(36);

    dataset.nft = {
      tokenId: Math.floor(Math.random() * 100000),
      mintedAt: new Date().toISOString(),
      metadataURL: `https://dummy-nft.io/token/${dataset.id}`,
      owner: "0xDEADBEEF...",
      txHash: "0x" + Math.random().toString(16).slice(2, 18),
    };

    dataset.updatedAt = new Date();
    writeDatasets(datasets);

    res.json({ success: true, certified: dataset });
  } catch (err) {
    console.error("Certification Error:", err);
    res.status(500).json({ error: "Failed to certify dataset" });
  }
});

router.get("/certified", express.json(), (req, res) => {
  try {
    const datasets = readDatasets();
    const certified = datasets.filter((ds) => ds.isCertified);
    res.json(certified);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch certified datasets" });
  }
});

router.get("/nfts", express.json(), (req, res) => {
  try {
    const datasets = readDatasets();
    const nfts = datasets.filter((ds) => ds.isCertified && ds.nft);
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch NFT datasets" });
  }
});

module.exports = router;
