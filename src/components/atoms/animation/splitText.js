"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  children,
  className = "",
  delay = 50, // ms antara huruf
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !children) return;

    const el = ref.current;

    let splitter;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
      });
    } catch (error) {
      console.error("Failed to create SplitText:", error);
      return;
    }

    let targets;
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "chars":
      default:
        targets = splitter.chars;
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation");
      splitter.revert();
      return;
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity";
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // animasi mulai saat elemen terlihat di viewport
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => {
          scrollTriggerRef.current = self;
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        gsap.set(targets, { ...to, clearProps: "willChange" });
        onLetterAnimationComplete?.();
      },
    });

    // Set state awal
    tl.set(targets, { ...from, immediateRender: true });

    // Animasi masuk
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000, // konversi ms ke detik
    });

    return () => {
      tl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(targets);
      if (splitter) {
        splitter.revert();
      }
    };
  }, [
    children,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    onLetterAnimationComplete,
  ]);

  return (
    <h2
      ref={ref}
      className={`split-parent text-4xl lg:text-5xl font-bold ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {children}
    </h2>
  );
};

export default SplitText;
