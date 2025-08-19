"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
   <motion.div
  ref={ref}
  className={className}
  initial={{ opacity: 0, y, filter: "blur(10px)" }} // blur awal
  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
  transition={{ duration, delay, ease: "easeOut" }}
>
  {children}
</motion.div>

  );
};

export default FadeIn;
