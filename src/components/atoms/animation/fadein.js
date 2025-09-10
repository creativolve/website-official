"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  y = 20,
  threshold = 0.1,
  rootMargin = "0px",
  className = "",
}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target); // hanya element ini
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, rootMargin]);

  // pakai useMemo biar object animasi gak berubah tiap render
  const initial = useMemo(
    () => ({ opacity: 0, y, filter: "blur(10px)" }),
    [y]
  );

  const animate = useMemo(
    () => (inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}),
    [inView]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
