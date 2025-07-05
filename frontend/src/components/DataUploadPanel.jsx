import React, { useState, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiCopy, FiCheck, FiAlertCircle } from "react-icons/fi";

export default function DataUploadPanel({ onUploadComplete }) {
  const [cid, setCid] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [datasetName, setDatasetName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setError("");
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      uploadToBackend(file, datasetName, description);
    }
  };

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      uploadToBackend(file, datasetName, description);
    }
  };

  const handleNameChange = (e) => {
    setDatasetName(e.target.value);
    setError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError("");
  };

  const uploadToBackend = async (file, name, description) => {
    if (!name) {
      setError("Dataset name is required.");
      return;
    }
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setProgress(10);
    setCid(null);
    setError("");

    const formData = new FormData();
    formData.append("dataset", file);
    formData.append("name", name);
    formData.append("description", description || "");

    try {
      console.log("Sending upload request for file:", file.name);
      const res = await fetch("https://certifyaihackathon-vf-production.up.railway.app/api/dataset/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(60);
      const result = await res.json();
      console.log("Backend response status:", res.status); // Debug
      console.log("Backend response body:", result); // Debug

      if ((res.status === 200 || res.status === 201) && result.dataset?.cid) {
        setCid(result.dataset.cid);
        setProgress(100);
        if (onUploadComplete) onUploadComplete(result.dataset.cid);
      } else {
        throw new Error(
          result.error ||
          `Upload failed (Status: ${res.status}, Response: ${JSON.stringify(result)})`
        );
      }
    } catch (err) {
      console.error("Upload error:", err.message, { status: err.status });
      setError(`Upload failed: ${err.message}`);
      setProgress(0);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-white rounded-xl p-6 w-full max-w-xl mx-auto shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Step 1: Upload Training Data
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
          <FiAlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dataset Name *
        </label>
        <input
          type="text"
          value={datasetName}
          onChange={handleNameChange}
          placeholder="Enter dataset name"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          disabled={progress > 0 && progress < 100}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe your dataset"
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          disabled={progress > 0 && progress < 100}
        />
      </div>

      <div
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-400 rounded-lg transition ${
          progress > 0 && progress < 100
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-50/50 cursor-pointer"
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => {
          if (progress === 0 || progress === 100) fileInputRef.current.click();
        }}
      >
        <AiOutlineCloudUpload
          size={48}
          className="text-blue-500 mb-3 animate-bounce"
        />
        <p className="text-lg font-semibold text-gray-700 mb-1">
          Upload AI Training Dataset
        </p>
        <p className="text-sm text-gray-500 text-center max-w-md">
          CSV, JSON, ZIP, or image datasets. Stored permanently on IPFS via Pinata.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".csv,.json,.zip,.tar,.png,.jpg"
          disabled={progress > 0 && progress < 100}
        />
        {fileName && (
          <p className="text-sm text-blue-600 mt-3 font-medium">
            Selected:{" "}
            {fileName.length > 30
              ? `${fileName.substring(0, 15)}...${fileName.slice(-10)}`
              : fileName}
          </p>
        )}
      </div>

      {progress > 0 && progress < 100 && (
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="animate-spin">
                <AiOutlineCloudUpload className="text-blue-500" />
              </span>
              Uploading to server...
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Waiting for IPFS CID from Pinata...
          </p>
        </div>
      )}

      {cid && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">File CID (IPFS):</p>
            <button
              onClick={copyToClipboard}
              className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              {copied ? (
                <>
                  <FiCheck size={14} /> Copied!
                </>
              ) : (
                <>
                  <FiCopy size={14} /> Copy
                </>
              )}
            </button>
          </div>
          <p className="text-xs font-mono bg-gray-50 rounded-lg p-3 text-gray-800 break-all border border-gray-200">
            {cid}
          </p>
          <a
            href={`https://ipfs.io/ipfs/${cid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xs underline hover:text-blue-800"
          >
            View on IPFS
          </a>
          <p className="text-green-600 text-sm mt-2 font-medium">
            ✅ Upload complete. Dataset stored on IPFS.
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          By uploading, you agree to store this data permanently on the
          decentralized Filecoin/IPFS network.
        </p>
      </div>
    </div>
  );
}
