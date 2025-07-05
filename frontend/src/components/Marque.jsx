import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  const images = [
    "/marquee/1e.png",
    "/marquee/2e.png",
    "/marquee/3e.png",
    "/marquee/4e.png",
    "/marquee/5e.png",
    "/marquee/6e.png",
    "/marquee/7e.png",
    "/marquee/8e.png",
    "/marquee/9e.png",
    "/marquee/yurr.png",
  ];

  // Duplicate the image list to create infinite loop effect
  const marqueeImages = [...images, ...images];

  return (
    <div className="overflow-hidden whitespace-nowrap w-full 		bg-[#1F1F38] py-4">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {marqueeImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`marquee-${index}`}
            className="h-40 w-56 mr-10 object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
