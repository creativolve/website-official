"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Tambah durasi biar lebih lembut
      easing: t => Math.min(1, 1.001 - Math.pow(2, -12 * t)), // lebih halus daripada default
      smooth: true,
      smoothTouch: true,
      gestureOrientation: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
