"use client"

import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import React from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  children,
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' atau 'chars'
  direction = 'top',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  // Convert children jadi array
  const childrenArray = React.Children.toArray(children);

  // Fungsi untuk split string menjadi kata/huruf
  const getSegments = (child) => {
    if (typeof child === 'string') {
      return animateBy === 'words' ? child.split(' ') : child.split('');
    }
    return [child]; // React node tetap 1 segment
  };

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {childrenArray.flatMap((child, childIndex) => {
        const segments = getSegments(child);
        return segments.map((segment, index) => (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={`${childIndex}-${index}`}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times,
              delay: ((childIndex * segments.length + index) * delay) / 1000,
              ease: easing,
            }}
            onAnimationComplete={
              childIndex === childrenArray.length - 1 &&
              index === segments.length - 1
                ? onAnimationComplete
                : undefined
            }
          >
            {typeof segment === 'string'
              ? segment === ' '
                ? '\u00A0'
                : segment
              : segment}
            {typeof segment === 'string' &&
              animateBy === 'words' &&
              index < segments.length - 1 &&
              '\u00A0'}
          </motion.span>
        ));
      })}
    </p>
  );
};

export default BlurText;
