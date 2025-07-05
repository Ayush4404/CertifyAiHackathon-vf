import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const buttonRef = useRef(null);
  const cardRefs = useRef([]);
  const challengeRef = useRef(null);

  useEffect(() => {
    // Initial load animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out" }
    );
    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.8, ease: "back.out(1.7)" }
    );

    // Cards animation
    cardRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          delay: 1 + i * 0.2,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });

    // Scroll-triggered challenge section
    gsap.fromTo(
      challengeRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: challengeRef.current,
          start: "top 80%",
        },
        duration: 1,
        ease: "power2.out"
      }
    );
  }, []);

  return (
    <div className="bg-white text-black font-sans">
      {/* <header className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
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

      <section className="relative flex flex-col items-center text-center px-6 py-40 bg-gradient-to-r from-blue-500 to-purple-600 bg-cover bg-center text-white z-0">
      <img
            src="/background vid.png"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover  -z-1"
            style={{ pointerEvents: "none" }}
          />
          {/* <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/6Z5XfBFhbHkvC-Xo/scene.splinecode" />
        </div> */}
        <p className="text-sm text-white/80 mb-2 ">FIGHT DEEPFAKES WITH VERIFIABLE TRUTH</p>
        <h1
          ref={headingRef}
          className="text-5xl font-bold mb-4 max-w-2xl leading-tight"
        >
          Certify AI Training Data
        </h1>
        <p
          ref={subRef}
          className="max-w-2xl text-white/90 mb-8 text-lg"
        >
          Prove your AI models were trained on authentic data using Filecoin storage
          and zero-knowledge proofs. Combat hallucinations and misinformation
          with cryptographic verification.
        </p>
        <button
          ref={buttonRef}
          className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition transform hover:scale-105"
        >
          Try Live Demo
        </button>

        {/* Overlay Cards */}
        <div className="absolute bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2 w-full px-6">
          <div className="flex flex-col sm:flex-row justify-center gap-6 bg-transparent">
            {[
              {
                tag: "1. Store",
                title: "Immutable Data Storage",
                desc: "Upload datasets to Filecoin's decentralized network with content-addressed identifiers",
                shadow: "shadow-blue-500/30",
                color: "bg-blue-100 text-blue-600"
              },
              {
                tag: "2. Prove",
                title: "ZK Verification",
                desc: "Generate zero-knowledge proofs confirming data integrity and provenance",
                shadow: "shadow-purple-500/30",
                color: "bg-purple-100 text-purple-600"
              },
              {
                tag: "3. Trust",
                title: "Tamper-Proof Certification",
                desc: "Get on-chain verification via FVM that anyone can audit",
                shadow: "shadow-pink-500/30",
                color: "bg-pink-100 text-pink-600"
              },
            ].map((card, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`bg-white p-6 rounded-2xl w-full sm:w-1/4 shadow-lg ${card.shadow} border border-gray-100 hover:shadow-xl transition`}
              >
                <span className={`inline-block text-xs px-3 py-1 rounded-full ${card.color} mb-3 font-medium`}>
                  {card.tag}
                </span>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-40 sm:h-52"></div>

      <section ref={challengeRef} id="problem" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-blue-600 font-semibold mb-2 uppercase tracking-wider text-sm">The Challenge</h2>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              AI Can't Prove Its Truthfulness
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Today's AI models have no way to cryptographically verify their training data. 
              This leads to hallucinations, deepfakes, and untrustworthy outputs. Without 
              verifiable provenance, we can't trust critical AI applications in healthcare, 
              finance, or media.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
              See Our Solution
            </button>
          </div>
          <div className="flex justify-center">
            {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center text-gray-500"> </div>*/}
            <img src="/brain.jpg" className="rounded-xl w-full h-full"></img>
              {/* AI hallucination visualization */}
            
          </div>
        </div>
      </section>
    </div>
  );
}
