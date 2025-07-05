// src/components/CertifiedGallery.jsx
import React, { useEffect, useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { BsLink45Deg } from "react-icons/bs";

export default function CertifiedGallery() {
  const [certified, setCertified] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const fetchCertified = async () => {
    try {
      const res = await fetch("https://certifyaihackathon-vf-production.up.railway.app/api/dataset/certified");
      const data = await res.json();
      setCertified(data);
    } catch (err) {
      console.error("Failed to load certified models", err);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  useEffect(() => {
    fetchCertified();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          🛡️ Certified AI Model Datasets
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          These datasets have been cryptographically verified and certified using ZK Proofs and Filecoin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {certified.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-white truncate">
                  📁 {item.name}
                </h3>
                <FiCheckCircle className="text-green-400" size={20} title="Certified" />
              </div>

              <p className="text-sm text-gray-300 mb-2">
                <span className="font-medium text-gray-400">CID:</span>{" "}
                <span className="break-all">{item.cid}</span>
              </p>

              <div className="flex items-center gap-3 mt-2">
                <a
                  href={`https://ipfs.io/ipfs/${item.cid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-xs inline-flex items-center gap-1"
                >
                  <BsLink45Deg /> View on IPFS
                </a>
                <button
                  onClick={() => copyToClipboard(item.cid, item._id)}
                  className="text-blue-400 text-xs hover:text-blue-300"
                >
                  {copiedId === item._id ? "Copied!" : "Copy CID"}
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-300">
                <span className="font-medium text-gray-400">Proof Hash:</span>{" "}
                <span className="break-all">{item.proof || "N/A"}</span>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Certified on:{" "}
                {new Date(item.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))}
        </div>

        {certified.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No certified datasets yet.</p>
        )}
      </div>
    </div>
  );
}
