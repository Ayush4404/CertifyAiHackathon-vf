import React from "react";
import { motion } from "framer-motion";

export default function TechStackFooter() {
  const techStack = [
    {
      src: "/filecoin.png",
      alt: "Filecoin",
      description: "Decentralized Storage Network",
    },
    {
      src: "/fvm-logo.png",
      alt: "FVM",
      description: "Smart Contracts on Filecoin",
    },
    {
      src: "/RISC.png",
      alt: "RISC Zero",
      description: "ZK Proof Execution Layer",
    },
    {
      src: "/ipfs.png",
      alt: "IPFS",
      description: "Peer-to-Peer Data Protocol",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0f1c] to-[#1a1f2c] py-20 px-6 overflow-hidden text-white">
      {/* Floating Blurs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14">
          {techStack.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 transition duration-300 shadow-sm hover:shadow-md">
                <img
                  src={tech.src}
                  alt={tech.alt}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
              <p className="mt-4 text-sm text-white/80 font-medium">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2">
            <img src="/filecoin.png" alt="Filecoin" className="h-6 w-auto" />
            <span className="text-white font-semibold tracking-wide">CertifyAI</span>
          </div>

          {/* Copyright */}
          <p className="text-center">© {new Date().getFullYear()} CertifyAI. All rights reserved.</p>

          {/* Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
