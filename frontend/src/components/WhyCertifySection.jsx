import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaDatabase, 
  FaShieldAlt, 
  FaLink, 
  FaFileContract,
  FaUserShield,
  FaChartLine,
  FaGlobeAmericas
} from "react-icons/fa";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { BsFileLock2Fill } from "react-icons/bs";
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

const bentoData = [
  {
    title: "Immutable Data Provenance",
    description: "Every training dataset permanently stored on Filecoin with cryptographic content addressing",
    icon: <FaDatabase className="text-blue-500 text-3xl" />,
    bg: "bg-blue-50",
    border: "border-blue-200",
    colSpan: "col-span-2",
  },
  {
    title: "Zero-Knowledge Verification",
    description: "Cryptographic proofs validate data integrity without exposing raw content",
    icon: <RiShieldKeyholeFill className="text-purple-500 text-3xl" />,
    bg: "bg-purple-50",
    border: "border-purple-200",
    colSpan: "col-span-1",
  },
  {
    title: "Decentralized Trust Network",
    description: "No single point of failure - verified by the Filecoin network",
    icon: <FaLink className="text-green-500 text-3xl" />,
    bg: "bg-green-50",
    border: "border-green-200",
    colSpan: "col-span-1",
  },
  {
    title: "Deepfake Protection",
    description: "Tamper-proof certification prevents model manipulation",
    icon: <FaUserShield className="text-red-500 text-3xl" />,
    bg: "bg-red-50",
    border: "border-red-200",
    colSpan: "col-span-1",
  },
  {
    title: "On-Chain Verification",
    description: "Permanent records stored on FVM for transparent auditing",
    icon: <FaFileContract className="text-yellow-500 text-3xl" />,
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    colSpan: "col-span-2",
  },
  // Spline Box (custom tile)
  {
    isSpline: true,
    colSpan: "col-span-3 md:col-span-1",
  }
];

export default function WhyCertifySection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = Array.from(containerRef.current.children);
    gsap.fromTo(
      items,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why CertifyAI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cryptographic verification solves critical challenges in AI development and deployment
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-3 md:grid-cols-3 gap-6"
        >
          {bentoData.map((item, index) => (
            <div key={index} className={`${item.colSpan}`}>
              {item.isSpline ? (
                <div className="h-[400px] w-full rounded-2xl overflow-hidden transition-all duration-300">
    <Spline
      scene="https://prod.spline.design/PUxXUaR32aIfxzAN/scene.splinecode"
      className="w-full h-full"
    />
  </div>
              ) : (
                <div
                  className={`h-full ${item.bg} ${item.border} rounded-2xl p-8 border shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative`}
                >
                  {/* Background gradient blur */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full filter blur-3xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300 rounded-full filter blur-3xl -ml-10 -mb-10"></div>
                  </div>

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center p-3 rounded-lg ${item.bg?.replace('50', '100')} mb-6`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "89%", label: "Accuracy Improvement", icon: <FaChartLine className="text-blue-500 mx-auto text-2xl mb-2" /> },
              { value: "150+", label: "Verified Models", icon: <BsFileLock2Fill className="text-purple-500 mx-auto text-2xl mb-2" /> },
              { value: "40x", label: "Faster Audits", icon: <FaShieldAlt className="text-green-500 mx-auto text-2xl mb-2" /> },
              { value: "100%", label: "Immutable Records", icon: <FaDatabase className="text-yellow-500 mx-auto text-2xl mb-2" /> }
            ].map((stat, i) => (
              <div key={i}>
                {stat.icon}
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
