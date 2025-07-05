import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VerificationBadge({ cid, proofHash }) {
  const [copied, setCopied] = useState(false);
  const badgeRef = useRef(null);

  const [verificationData] = useState({
    modelName: "Stable Diffusion v1.5",
    datasetSize: "1.2TB",
    verificationTime: new Date().toLocaleString(),
    proofDuration: "2m 18s",
    storageProviders: 3,
  });

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayCID = cid || "QmXyW...1234";
  const displayProofHash = proofHash || "0x8a3f...d27c";
  const fvmLink = `https://fvm.filscan.io/tx/${displayProofHash}`;

  useEffect(() => {
    const el = badgeRef.current;

    gsap.to(el, {
      rotate: 90,
      scale:1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="bg-white py-16 px-4 min-h-screen flex items-center justify-center">
      {/* Fixed size wrapper to prevent layout shift */}
      <div className="w-[400px] h-[600px] relative overflow-visible">
        <motion.div
          ref={badgeRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full origin-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-blue-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300 p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <FaCheckCircle className="text-white text-xl drop-shadow" />
              <h2 className="text-xl font-bold text-white drop-shadow">AI MODEL CERTIFIED</h2>
            </div>
            <p className="text-xs text-white/80 mt-1">
              Zero-Knowledge Proof Verification Complete
            </p>
          </div>

          {/* Image */}
          <div className="relative group">
            <img
              src="/certified.png"
              alt="Certified AI Output"
              className="w-full h-64 object-fit border-b border-purple-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm">Output generated from verified training data</p>
            </div>
            <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Certified
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{verificationData.modelName}</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Dataset CID:</span>
                <div className="flex items-center">
                  <span className="font-mono text-blue-600 mr-2 truncate max-w-[140px]">
                    {displayCID}
                  </span>
                  <button onClick={() => copyToClipboard(displayCID)} className="text-gray-400 hover:text-black">
                    <FaCopy size={14} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Proof Hash:</span>
                <div className="flex items-center">
                  <span className="font-mono text-purple-600 mr-2 truncate max-w-[140px]">
                    {displayProofHash}
                  </span>
                  <button onClick={() => copyToClipboard(displayProofHash)} className="text-gray-400 hover:text-black">
                    <FaCopy size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                <div>
                  <p className="text-gray-500">Dataset Size</p>
                  <p className="text-gray-800">{verificationData.datasetSize}</p>
                </div>
                <div>
                  <p className="text-gray-500">Storage Providers</p>
                  <p className="text-gray-800">{verificationData.storageProviders}x replicated</p>
                </div>
                <div>
                  <p className="text-gray-500">Proof Duration</p>
                  <p className="text-gray-800">{verificationData.proofDuration}</p>
                </div>
                <div>
                  <p className="text-gray-500">Verified On</p>
                  <p className="text-gray-700 text-xs">{verificationData.verificationTime}</p>
                </div>
              </div>
            </div>

            {/* Link */}
            <div className="mt-6 pt-4 border-t border-blue-200">
              <a
                href={fvmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-sm bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 text-white py-2 px-4 rounded-lg transition"
              >
                <span>View on FVM Explorer</span>
                <FaExternalLinkAlt size={12} />
              </a>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/60 px-3 py-1 rounded-full">
                <img src="/filecoin-logo.png" alt="Filecoin" className="h-4" />
                <span className="text-xs text-gray-700">Powered by Filecoin FVM</span>
              </div>
            </div>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
