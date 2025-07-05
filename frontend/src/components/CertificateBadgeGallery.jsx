// src/components/CertificateBadgeGallery.jsx
import React, { useEffect, useState } from "react";
import { FaMedal, FaCertificate } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";

export default function CertificateBadgeGallery() {
  const [certified, setCertified] = useState([]);

  useEffect(() => {
    const fetchCertified = async () => {
      try {
        const res = await fetch("https://certifyaihackathon-vf-production.up.railway.app/api/dataset/certified");
        const data = await res.json();
        setCertified(data);
      } catch (err) {
        console.error("Error loading certified datasets", err);
      }
    };

    fetchCertified();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-300">
          🎖️ AI Certification Badges
        </h2>
        <p className="text-gray-400 mb-12">
          These digital badges certify the authenticity of your training data.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {certified.map((item, index) => (
            <div
              key={item._id}
              className="bg-gray-800 border border-yellow-500/30 rounded-xl p-5 shadow-xl hover:shadow-yellow-500/30 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <FaMedal size={20} className="text-yellow-400" />
                <span className="text-yellow-300 text-xs">NFT ID #{index + 1}</span>
              </div>

              <h3 className="text-lg font-semibold text-white truncate mb-1">
                📁 {item.name}
              </h3>

              <p className="text-xs text-gray-400 mb-1 break-words">
                CID: {item.cid}
              </p>

              <p className="text-xs text-gray-400 mb-1 break-words">
                Proof: {item.proof || "N/A"}
              </p>

              <a
                href={`https://ipfs.io/ipfs/${item.cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs inline-flex items-center gap-1 mt-2"
              >
                <BsLink45Deg /> View Dataset
              </a>

              <p className="mt-4 text-xs text-gray-500">
                Certified on:{" "}
                {new Date(item.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              <div className="mt-3 text-yellow-400 text-sm flex items-center gap-2 justify-center">
                <FaCertificate size={18} />
                <span>Certified Badge</span>
              </div>
            </div>
          ))}
        </div>

        {certified.length === 0 && (
          <p className="text-gray-400 mt-10">No certified badges found yet.</p>
        )}
      </div>
    </div>
  );
}
