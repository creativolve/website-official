"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Navbar = dynamic(() => import("./navbar"), { ssr: true });
const About = dynamic(() => import("./about"), { ssr: true });
const Service = dynamic(() => import("./service"), { ssr: true });
const Footer = dynamic(() => import("./footer"), { ssr: false });
const Hero = dynamic(() => import("./hero"), { ssr: true });
const WhyOur = dynamic(() => import("./why"), { ssr: true });
const Blog = dynamic(() => import("./blog"));

const Loader = dynamic(() => import("./load"), { ssr: false });

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      await Promise.all([
        new Promise((resolve) => {
          const img = new Image();
          img.src = "/images/load_logo.png"; // Pastikan path benar
          img.onload = resolve;
          img.onerror = resolve; // Tambahkan fallback jika gagal
        }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
      setIsLoading(false);
    };

    loadAssets();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Navbar />
      <main
        className="
        px-[45px]
        md:px-[100px]
        lg:px-[200px] lg:py-[10px]
        "
      >
        <Hero />
        <About />
        <Service />
        <WhyOur />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
