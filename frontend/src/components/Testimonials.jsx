import React, { useState } from "react";

const testimonials = [
  {
    name: "Alice Mathews",
    title: "AI Ethics Researcher",
    image: "/fem.jpg",
    quote:
      "With certified models, we reduced hallucinations in our LLMs by 35%. Trustable data changes everything.",
  },
  {
    name: "Dr. Sunil Rao",
    title: "Radiologist",
    image: "/male1.jpg",
    quote:
      "When accuracy matters most — like in cancer scans — certified AI gave us the transparency we needed.",
  },
  {
    name: "Nora Patel",
    title: "Data Governance Lead",
    image: "/male2.jpg",
    quote:
      "Auditable provenance is a game-changer. We now know exactly what our models learned from.",
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="py-20 px-6 bg-gray-100 text-center">
      <h3 className="text-sm uppercase tracking-widest text-blue-400 mb-2">
        What experts are saying
      </h3>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-12">
        Testimonials
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex flex-col items-center p-6 rounded-lg shadow-md transition-all duration-300 transform cursor-pointer w-full md:w-1/3 ${
                isActive
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-white text-gray-800 scale-95 opacity-70 hover:scale-100 hover:opacity-100 hover:shadow-lg"
              }`}
            >
              <div className="text-4xl leading-snug mb-4">“</div>
              <p className="text-sm mb-6">{testimonial.quote}</p>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full border-2 border-white mb-2 object-cover"
              />
              <h4 className="font-semibold text-base">{testimonial.name}</h4>
              <p className="text-xs opacity-80">{testimonial.title}</p>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              i === activeIndex ? "bg-blue-500 scale-125" : "bg-gray-400"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
