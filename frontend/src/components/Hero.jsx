import React from "react";

export default function HeroSection() {
  return (
    <div className="min-h-[100vh]">
      {/* Header
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <img src="/filecoin-logo.png" alt="Filecoin" className="w-6 h-6" />
          <span className="text-lg font-bold">CertifyAI</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
          <a href="#how-it-works">How It Works</a>
          <a href="#demo">Demo</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#tech">Technology</a>
          <a href="#team">Team</a>
        </nav>
        <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium shadow hover:bg-gray-800 transition">
          Connect Wallet
        </button>
      </header> */}

      {/* Hero Section Container */}
      <div
        className="w-full max-w-7xl bg-white rounded-[30px] shadow-xl overflow-hidden mx-auto mt-4"
        style={{
          maxWidth: "80rem",
          borderRadius: "30px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          margin: "16px auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Hero Section */}
        <section
          className="relative w-full min-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4 py-12 text-white text-center"
          style={{
            minHeight: "80vh",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px",
            textAlign: "center",
          }}
        >
          {/* Replace with your static background image */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
        >
            <source src="/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
         {/* <div className="absolute inset-0 w-full h-full object-cover z-0">
          <Spline scene="https://prod.spline.design/6Z5XfBFhbHkvC-Xo/scene.splinecode" />
        </div> */}

          <h1 className="text-5xl font-sans font-bold mb-4 z-10 leading-tight tracking-tight">
            Certify AI Training Data
          </h1>
          <p className="text-white/70 text-lg mb-8 z-10">
            AI Data Certification Platform
          </p>
          <button
            className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105 z-10"
          >
            Try Live Demo
          </button>
        </section>
      </div>
    </div>
  );
}
