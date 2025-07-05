import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi"; // For error icon

export default function DatasetDashboard() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added for error display
  const [certifyingId, setCertifyingId] = useState(null);

  const fetchDatasets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:4000/api/dataset", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch datasets: ${res.statusText}`);
      }
      const data = await res.json();
      setDatasets(data);
    } catch (err) {
      console.error("Failed to load datasets:", err);
      setError("Failed to load datasets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const certifyDataset = async (id) => {
    if (!id) return;
    setCertifyingId(id);
    setError("");
    try {
      const res = await fetch(`http://localhost:4000/api/dataset/certify/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // Empty body, as backend doesn't use it
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Certification failed.");
      }
      // No alert; show success in UI
      fetchDatasets(); // Refresh datasets
    } catch (err) {
      console.error("Certification failed:", err);
      setError(`Certification failed for dataset ${id}: ${err.message}`);
    } finally {
      setCertifyingId(null);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        📦 Uploaded AI Datasets
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
          <FiAlertCircle size={20} />
          {error}
        </div>
      )}

      {loading && (
        <p className="text-center text-gray-500 animate-pulse">Loading datasets...</p>
      )}

      {!loading && datasets.length === 0 && (
        <p className="text-center text-gray-500">No datasets found yet. Upload one to get started!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((ds) => (
          <div
            key={ds.id || ds._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition relative"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-1">{ds.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {ds.description || "No description provided"}
            </p>

            <p className="text-xs text-gray-400 break-all">
              <span className="font-semibold text-gray-500">CID:</span>{" "}
              {ds.cid}
            </p>

            <a
              href={`https://gateway.pinata.cloud/ipfs/${ds.cid}`}
              target="_blank"
              rel="noreferrer"
              className="block mt-3 text-blue-600 text-sm underline hover:text-blue-800"
            >
              🔗 View on IPFS
            </a>

            {/* Certification Section */}
            {ds.isCertified ? (
              <div className="mt-4 flex flex-col gap-1">
                <span className="inline-block w-fit px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  ✅ Certified
                </span>

                {ds.nft ? (
                  <div className="text-xs mt-2 bg-gray-100 p-2 rounded-md border border-gray-200">
                    <p className="text-gray-700 font-semibold">NFT Minted</p>
                    <p className="text-gray-600">
                      🆔 Token ID:{" "}
                      <span className="font-mono">{ds.nft.tokenId}</span>
                    </p>
                    <p className="text-gray-600">
                      🕓 Minted:{" "}
                      {new Date(ds.nft.mintedAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    {ds.nft.metadataURL && (
                      <a
                        href={ds.nft.metadataURL}
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        rel="noreferrer"
                      >
                        🔗 Metadata
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    NFT info not available.
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => certifyDataset(ds.id || ds._id)}
                className={`mt-4 bg-blue-600 text-white text-sm px-4 py-1 rounded transition ${
                  certifyingId === (ds.id || ds._id)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={certifyingId === (ds.id || ds._id)}
              >
                {certifyingId === (ds.id || ds._id)
                  ? "Certifying..."
                  : "Certify Dataset"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}