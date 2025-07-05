import React, { useState } from "react";

export default function UploadDataset() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [cid, setCid] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, file } = formData;
    if (!name || !file) {
      alert("Name and file are required");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setCid("");

    try {
      // Create FormData for multipart/form-data request
      const data = new FormData();
      data.append("dataset", file); // Matches multer's expected field name
      data.append("name", name);
      data.append("description", formData.description || ""); // Optional description

      // Send to backend's /upload route
      const res = await fetch("https://certifyaihackathon-vf-production.up.railway.app/api/dataset/upload", {
        method: "POST",
        body: data, // No need to set Content-Type; fetch handles it for FormData
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Upload to backend failed");
      }

      setCid(result.dataset.cid);
      setSuccessMsg("✅ Dataset uploaded to IPFS via backend!");
      
      // Reset form
      setFormData({ name: "", description: "", file: null });
    } catch (err) {
      console.error("Upload error:", err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Upload Dataset to IPFS 📁
      </h2>

      {successMsg && (
        <p className="text-green-600 text-center mb-4 font-medium">
          {successMsg}
        </p>
      )}

      {cid && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-700 font-medium">CID:</p>
          <a
            href={`https://gateway.pinata.cloud/ipfs/${cid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {cid}
          </a>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 border"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dataset Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload File *
          </label>
          <input
            type="file"
            name="file"
            accept=".csv,.json,.zip,.txt,.tsv"
            onChange={handleChange}
            required
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload to Filecoin"}
        </button>
      </form>
    </div>
  );
}
