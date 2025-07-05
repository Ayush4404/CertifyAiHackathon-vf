// components/FaqSection.jsx

import React, { useState } from "react";

const faqs = [
  {
    question: "What is certified AI?",
    answer:
      "Certified AI refers to models trained on datasets that are verifiably authentic, auditable, and tamper-proof, often backed by technologies like ZK-proofs and Filecoin.",
  },
  {
    question: "How does data certification work?",
    answer:
      "We store dataset hashes and ZK-proofs on Filecoin/IPFS. Anyone can verify the authenticity of the data your model was trained on.",
  },
  {
    question: "Why does certification matter?",
    answer:
      "Unverified models often hallucinate or produce biased outputs. Certification builds trust, especially in critical domains like healthcare and finance.",
  },
  {
    question: "Can I audit other models?",
    answer:
      "Yes. If models were published with proof metadata, you can inspect dataset origins and modifications via our UI or CLI tools.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) =>
    setActiveIndex(index === activeIndex ? null : index);

  return (
    <section className="py-20 px-6 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h3 className="text-sm uppercase text-blue-500 font-semibold tracking-wide">
          Got Questions?
        </h3>
        <h2 className="text-4xl font-bold text-gray-900">FAQs</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 pb-4 cursor-pointer"
            onClick={() => toggleIndex(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium">{faq.question}</h4>
              <span className="text-blue-500 text-xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
