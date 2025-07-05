import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const TOTAL_FRAMES = 121; // Confirmed 101 frames

  useEffect(() => {
    const frameImages = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`; // Matches your 101 frames
      frameImages.push(img);
    }
    Promise.all(
      frameImages.map(img =>
        new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            resolve(null);
          };
        })
      )
    ).then(loadedImages => {
      const validImages = loadedImages.filter(img => img !== null);
      if (validImages.length > 0) {
        setImages(validImages);
        console.log(`Loaded ${validImages.length} images successfully`);
      } else {
        console.error("No images loaded successfully.");
      }
    });
  }, []);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;

    canvas.width = 1920 * scale;
    canvas.height = 1080 * scale;
    context.scale(scale, scale);

    const frameState = { frame: 0 };

    const render = () => {
      const frameIndex = Math.floor(frameState.frame);
      const img = images[frameIndex % images.length];
      if (img?.complete && img.naturalHeight > 0) {
        context.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
        context.drawImage(img, 0, 0, canvas.width / scale, canvas.height / scale);
        console.log(`Rendering frame ${frameIndex}`);
      } else {
        console.warn(`Image at frame ${frameIndex} is not loaded or broken`);
      }
    };

    // Ensure ScrollTrigger refreshes after images load
    ScrollTrigger.refresh();

    gsap.to(frameState, {
      frame: images.length - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: canvas,
        start: "top top", // Start when canvas reaches top
        end: () => window.innerHeight * 10, // Increase scroll length for 101 frames
        scrub: true,
        pin: true,
        onUpdate: () => console.log("ScrollTrigger updating"),
      },
      onUpdate: render,
    });

    if (images[0]?.complete) render(); // Initial render
  }, [images]);

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-auto" style={{ maxHeight: '1080px' }} />
      {/* Add extra content to ensure scrollable area */}
      <div style={{ height: '2000px', background: '#f0f0f0' }}>
        Scroll down to see animation
      </div>
    </div>
  );
};

export default ScrollAnimation;