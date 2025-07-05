import React from "react";
import { motion } from "framer-motion";

export default function TechStackFooter() {
  const techStack = [
    { 
      src: "/filecoin.png", 
      alt: "Filecoin",
      description: "Decentralized storage network"
    },
    { 
      src: "/fvm-logo.png", 
      alt: "FVM",
      description: "Smart contract platform"
    },
    { 
      src: "/RISC.png", 
      alt: "RISC Zero",
      description: "Zero-knowledge proof system"
    },
    { 
      src: "/ipfs.png", 
      alt: "IPFS",
      description: "Content-addressed protocol"
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0f1c] to-[#1a1f2c] py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Circuit-style grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {techStack.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 mb-4 hover:bg-white/10 transition duration-300">
                <img
                  src={tech.src}
                  alt={tech.alt}
                  className="h-12 object-contain grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
              <p className="text-center text-sm text-white/70">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>

        {/* Footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <img src="/filecoin.png" alt="Filecoin" className="h-6" />
            <span className="text-white/80">CertifyAI</span>
          </div>

          <p className="text-sm text-white/60 text-center">
            © {new Date().getFullYear()} CertifyAI. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}