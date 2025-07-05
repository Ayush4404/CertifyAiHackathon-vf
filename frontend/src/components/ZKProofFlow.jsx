import React, { useState } from "react";
import { FaDatabase, FaShieldAlt } from "react-icons/fa";
import { SiRiscv } from "react-icons/si";
import { BsFileEarmarkLock } from "react-icons/bs";
import { motion } from "framer-motion";

export default function ZKProofFlow() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      icon: <FaDatabase size={36} className="text-blue-400" />,
      title: "Immutable Data Storage",
      description: "Training dataset is stored on Filecoin with content addressing (CID)",
      tech: "Filecoin/IPFS",
      color: "blue",
      action: "Upload Dataset"
    },
    {
      icon: <SiRiscv size={36} className="text-purple-400" />,
      title: "Zero-Knowledge Proof",
      description: "Cryptographic proof generated without revealing raw data",
      tech: "RISC Zero ZKVM",
      color: "purple",
      action: "Generate Proof"
    },
    {
      icon: <BsFileEarmarkLock size={36} className="text-green-400" />,
      title: "On-Chain Verification",
      description: "Proof is permanently recorded and verifiable on Filecoin Virtual Machine",
      tech: "FVM Smart Contract",
      color: "green",
      action: "Verify"
    },
    {
      icon: <FaShieldAlt size={36} className="text-yellow-400" />,
      title: "AI Model Certification",
      description: "Your model receives a tamper-proof authenticity certificate",
      tech: "NFT Badge",
      color: "yellow",
      action: "Complete"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          How It Works: Verifiable AI Training
        </h2>
        <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-16">
          A 4-step process to cryptographically certify your AI model's training data integrity
        </p>

        {/* Progress Bar */}
        <div className="relative mb-16 max-w-4xl mx-auto">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeStep === index ? 'scale-110' : ''} ${
                  index <= activeStep 
                    ? `bg-${step.color}-500 shadow-lg shadow-${step.color}-500/30`
                    : 'bg-gray-700 border border-gray-600'
                }`}
              >
                {React.cloneElement(step.icon, {
                  className: `text-white ${activeStep === index ? 'scale-125' : ''}`
                })}
              </button>
            ))}
          </div>
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-700 z-0">
            <motion.div
              className={`h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500`}
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.7, y: 20 }}
              animate={{ 
                opacity: activeStep === index ? 1 : 0.7,
                y: activeStep === index ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
              className={`bg-gray-800/50 border rounded-xl p-6 backdrop-blur-sm transition-all ${
                activeStep === index 
                  ? `border-${step.color}-400 shadow-lg shadow-${step.color}-500/20`
                  : 'border-gray-700'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className={`mb-4 inline-block p-3 rounded-lg bg-gradient-to-br from-${step.color}-600 to-${step.color}-800`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{step.description}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded bg-${step.color}-900/50 text-${step.color}-300`}>
                  {step.tech}
                </span>
                {activeStep === index && (
                  <button className={`text-xs px-3 py-1 rounded-full bg-${step.color}-600 hover:bg-${step.color}-500 transition`}>
                    {step.action}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Explanation */}
        <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm">
          <div className="flex items-start">
            <div className={`p-3 rounded-lg bg-gradient-to-br from-${steps[activeStep].color}-600 to-${steps[activeStep].color}-800 mr-4`}>
              {steps[activeStep].icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{steps[activeStep].title}</h3>
              <p className="text-gray-300 mb-4">{steps[activeStep].description}</p>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-mono text-sm text-gray-400 mb-2">Technical Details:</h4>
                <p className="text-sm">
                  {activeStep === 0 && (
                    <>SHA-256 CID generated for dataset. Stored across Filecoin's decentralized storage providers with 3x replication.</>
                  )}
                  {activeStep === 1 && (
                    <>RISC Zero zkVM generates STARK proof that the dataset was processed without revealing contents. Proof generation takes ~2 minutes for 1GB datasets.</>
                  )}
                  {activeStep === 2 && (
                    <>FVM smart contract verifies the ZK proof and emits an event with the model hash and dataset CID. Gas cost: ~0.01 FIL per verification.</>
                  )}
                  {activeStep === 3 && (
                    <>ERC-721 NFT certificate issued with metadata containing the model hash, dataset CID, and verification timestamp. Can be displayed in model UIs.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}