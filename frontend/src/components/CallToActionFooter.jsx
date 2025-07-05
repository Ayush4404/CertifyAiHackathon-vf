// components/CallToActionFooter.jsx

import React from "react";

export default function CallToActionFooter() {
  return (
    <section className="bg-gradient-to-r from-[#1f1f38] to-[#272752] text-white py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Want to Certify Your AI Model?
        </h2>
        <p className="text-blue-200 mb-8 text-sm md:text-base">
          Boost transparency, reduce hallucinations, and build trust with
          verifiable AI models powered by Filecoin and ZK-proofs.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
          Get Started
        </button>
      </div>

      {/* Optional social / badge links */}
      <div className="mt-8 text-xs text-blue-300">
        Open-source on <a href="#" className="underline">GitHub</a> · Join us on <a href="#" className="underline">Discord</a>
      </div>
    </section>
  );
}
