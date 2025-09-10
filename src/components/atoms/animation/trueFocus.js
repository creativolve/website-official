"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";

const TrueFocus = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = useMemo(() => sentence.split(" "), [sentence]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState(null);

  // Auto play
  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Hitung posisi kotak fokus
  useEffect(() => {
    if (currentIndex === null || !containerRef.current) return;
    const activeEl = wordRefs.current[currentIndex];
    if (!activeEl) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index) => {
    if (manualMode) setCurrentIndex(index);
  };

  const blurStyle = (isActive) => ({
    filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
    transition: `filter ${animationDuration}s ease`,
    "--border-color": borderColor,
    "--glow-color": glowColor,
  });

  return (
    <div
      className="relative text-white flex gap-4 justify-center items-center"
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="relative text-[1rem] font-black cursor-pointer"
            style={blurStyle(isActive)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {word}
          </span>
        );
      })}

      {focusRect && (
        <motion.div
          className="absolute top-0 left-0 pointer-events-none box-border border-0"
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
            opacity: 1,
          }}
          transition={{ duration: animationDuration }}
          style={{
            "--border-color": borderColor,
            "--glow-color": glowColor,
          }}
        >
          {["tl", "tr", "bl", "br"].map((pos) => (
            <span
              key={pos}
              className={`absolute w-4 h-4 border-[3px] rounded-[3px] ${
                pos === "tl"
                  ? "top-[-10px] left-[-10px] border-r-0 border-b-0"
                  : pos === "tr"
                  ? "top-[-10px] right-[-10px] border-l-0 border-b-0"
                  : pos === "bl"
                  ? "bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                  : "bottom-[-10px] right-[-10px] border-l-0 border-t-0"
              }`}
              style={{
                borderColor: "var(--border-color)",
                filter: "drop-shadow(0 0 4px var(--border-color))",
              }}
            ></span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TrueFocus;
