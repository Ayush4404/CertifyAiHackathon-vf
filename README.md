

## 📦 CertifyAI – Decentralized Dataset Certification using IPFS & Pinata(will change to file coin used pinata as it was free)

**CertifyAI** is a full-stack DApp that allows users to upload AI training datasets to decentralized storage (IPFS via Pinata), generate immutable CIDs, and certify them via ZK-like proof simulation. Certified datasets can also be associated with dummy NFTs to simulate Web3 ownership and authenticity.

---

### 🚀 Features

* 📁 Upload datasets (CSV, JSON, ZIP, Images, etc.)
* 🔐 Store files permanently on IPFS using [Pinata](https://www.pinata.cloud/)//will cahnge to filecoin later
* 🆔 Generate and display IPFS CID
* ✅ Certify datasets (adds proof + NFT-like metadata)
* 🧾 View all uploaded and certified datasets
* 🔗 Frontend built with React + Tailwind CSS
* ⚙️ Backend built with Express.js + Multer for uploads
* 📂 All dataset metadata stored locally in `datasets.json`

---

### 📸 Demo

Coming soon... *(you can host it on Vercel or render.com + backend on Railway)*

---

### 🧑‍💻 Tech Stack

| Layer        | Technology                                |
| ------------ | ----------------------------------------- |
| Frontend     | React, Tailwind CSS                       |
| Backend      | Node.js, Express.js                       |
| File Upload  | Multer (to receive), Pinata API (to IPFS)// will change to filecoin later |
| Storage      | IPFS (via Pinata)                         |
| Certifier    | Simulated ZK Proof + NFT info             |
| Data Storage | JSON file (`data/datasets.json`)          |

---

### 📂 Project Structure

```
/certifyai
├── frontend/           # React app
├── backend/
│   ├── routes/         # Express routes
│   ├── utils/          # Pinata upload logic
│   ├── data/           # datasets.json storage
├── uploads/            # Temporary file storage (auto-deleted)
```

---

### ⚙️ Setup Instructions

#### 1. Clone the repo

```bash
git clone https://github.com/Ayush4404/certifyai.git
cd certifyai
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret
PORT=4000
```

Start the backend:

```bash
npm run dev
```

---

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_PINATA_API_KEY=your_pinata_api_key
REACT_APP_PINATA_SECRET_API_KEY=your_pinata_secret
```

Start the frontend:

```bash
npm start
```

> Make sure both frontend (on port 3000) and backend (on port 4000) are running simultaneously.

---

### ✅ Certification Logic

When a user clicks "Certify":

* A dummy zk-proof hash is added
* A mock NFT metadata structure is generated
* Data is updated in `datasets.json`

---

### 📬 API Endpoints

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| POST   | `/api/dataset/upload`      | Upload dataset to Pinata         |
| GET    | `/api/dataset`             | Get all datasets                 |
| POST   | `/api/dataset/certify/:id` | Certify a dataset                |
| GET    | `/api/dataset/certified`   | Get certified datasets           |
| GET    | `/api/dataset/nfts`        | Get certified datasets with NFTs |

---

### 🔐 Environment Variables

Both frontend and backend require the following:

* `PINATA_API_KEY`
* `PINATA_SECRET_API_KEY`

You can get them from your [Pinata account dashboard](https://app.pinata.cloud/keys).

---

### 📄 License

MIT License — free to use and modify with attribution.

---

### ✨ Author

Built with 💻 by [Ayush Rawat](https://github.com/Ayush4404)

---

