import React, { useRef, useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaShieldAlt,
  FaHistory,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function BeforeAfterDemo() {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [currentCase, setCurrentCase] = useState(0);

  const demoCases = [
    {
      before: "/bef/faceaf.png",
      after: "/bef/facebef.jpeg",
      title: "Facial Recognition",
      description: "Without verification, models generate distorted features",
    },
    {
      before: "/certifiedlung.png",
      after: "/uncertifiedlung.png",
      title: "Medical Imaging",
      description: "Unverified training leads to inaccurate diagnoses",
    },
    {
      before: "/bef/textaf.jpeg",
      after: "/bef/textbef.jpeg",
      title: "Text Generation",
      description: "Hallucinations reduced with certified training data",
    },
  ];

  const handleDrag = (e) => {
    if (!isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (offsetX / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchDrag = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (offsetX / rect.width) * 100));
    setSliderPos(percentage);
  };

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-[#0e152c] to-[#1a1f3a] h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-3xl"
      >
        <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Certified vs Uncensored AI
        </h2>
        <p className="text-xl text-blue-200">
          See the dramatic difference verifiable training data makes
        </p>
      </motion.div>

      {/* Case Navigation */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={() => setCurrentCase((prev) => (prev - 1 + demoCases.length) % demoCases.length)}
          className="text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaArrowLeft />
        </button>

        <div className="text-center min-w-[200px]">
          <h3 className="text-xl font-semibold text-white">
            {demoCases[currentCase].title}
          </h3>
          <p className="text-sm text-gray-400">
            {demoCases[currentCase].description}
          </p>
        </div>

        <button
          onClick={() => setCurrentCase((prev) => (prev + 1) % demoCases.length)}
          className="text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Before/After Slider */}
      <motion.div
        key={currentCase}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 "
        ref={containerRef}
        onMouseMove={handleDrag}
        onTouchMove={handleTouchDrag}
      >
        {/* Before Image (Unverified) */}
        <img
          src={demoCases[currentCase].before}
          alt="Unverified Output"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* After Image (Certified) */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={demoCases[currentCase].after}
            alt="Certified Output"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slider Handle */}
        <div
          className={`absolute top-0 bottom-0 w-2 bg-white z-20 cursor-ew-resize ${
            isDragging ? "shadow-lg" : ""
          }`}
          style={{ left: `${sliderPos}%` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <div className="flex">
              <FaArrowLeft className="text-gray-800 text-xs" />
              <FaArrowRight className="text-gray-800 text-xs" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-red-600/90 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold z-30 backdrop-blur-sm">
          <FaTimesCircle />
          Uncensored AI
        </div>

        <div className="absolute top-4 right-4 bg-green-600/90 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold z-30 backdrop-blur-sm">
          <FaCheckCircle />
          Certified AI
        </div>

        {/* Watermark */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs z-30 backdrop-blur-sm">
          Drag to compare
        </div>
      </motion.div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl w-full">
        {[
          {
            icon: <FaEye className="text-blue-400 text-2xl" />,
            title: "Transparent Provenance",
            description: "Trace every model to its certified training data source",
          },
          {
            icon: <FaShieldAlt className="text-green-400 text-2xl" />,
            title: "Reduced Hallucinations",
            description: "40% fewer false outputs with verifiable training data",
          },
          {
            icon: <FaHistory className="text-purple-400 text-2xl" />,
            title: "Immutable Audit Trail",
            description: "Full version history stored on Filecoin's decentralized network",
          },
        ].map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-[#0e152c] to-[#1a1f3a] backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-blue-500/10 mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {benefit.title}
            </h3>
            <p className="text-blue-100 text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
