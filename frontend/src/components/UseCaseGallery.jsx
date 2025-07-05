import React from "react";
import { FaDna, FaMicroscope, FaNewspaper } from "react-icons/fa";
import { motion } from "framer-motion";

export default function UseCaseGallery() {
  const useCases = [
    {
      icon: <FaDna className="text-blue-400" size={28} />,
      title: "Medical AI Diagnosis",
      description: "Radiology models certified to use only peer-reviewed medical imaging datasets",
      badge: "FDA Approved",
      image: "/medical.jpg",
      color: "blue"
    },
    {
      icon: <FaMicroscope className="text-purple-400" size={28} />,
      title: "Scientific Research",
      description: "Reproducible AI models with verifiable training data from published studies",
      badge: "Peer Reviewed",
      image: "/research.jpg",
      color: "purple"
    },
    {
      icon: <FaNewspaper className="text-pink-400" size={28} />,
      title: "News Verification",
      description: "Fact-checking AI trained on certified historical news archives",
      badge: "Trusted Source",
      image: "/newspaper.jpg",
      color: "pink"
    }
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-500/20",
      border: "border-blue-400/30",
      text: "text-blue-400",
      pulse: "bg-blue-400",
      gradient: "from-blue-500"
    },
    purple: {
      bg: "bg-purple-500/20",
      border: "border-purple-400/30",
      text: "text-purple-400",
      pulse: "bg-purple-400",
      gradient: "from-purple-500"
    },
    pink: {
      bg: "bg-pink-500/20",
      border: "border-pink-400/30",
      text: "text-pink-400",
      pulse: "bg-pink-400",
      gradient: "from-pink-500"
    }
  };

  return (
    <div className="relative bg-white py-24 px-6">
      {/* Background gradient matching HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Trusted AI Applications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Industries transformed by verifiable AI training
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const colors = colorMap[useCase.color];
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Card with matching shadow */}
                <div className={`h-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${colors.bg}`}>
                  {/* Image with gradient overlay */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 ${colors.bg}`}></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} mr-4`}>
                        {useCase.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{useCase.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{useCase.description}</p>
                    
                    {/* Certification badge - matches HeroSection cards */}
                    <div className="absolute bottom-4 right-4">
                      <div className={`flex items-center ${colors.bg} ${colors.text} px-3 py-1 rounded-full ${colors.border} text-sm font-medium`}>
                        <span className={`w-2 h-2 ${colors.pulse} rounded-full mr-2 animate-pulse`}></span>
                        {useCase.badge}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating glow effect */}
                <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${colors.bg} blur-xl opacity-50`}></div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA button matching HeroSection style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            Explore More Use Cases
          </button>
        </motion.div>
      </div>
    </div>
  );
}