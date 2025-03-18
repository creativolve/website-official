"use client";

import Navbar from "./navbar";
import About from "./about";
import Service from "./service";
import Footer from "./footer";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import('./hero'), {
  ssr: false, // Matikan SSR jika komponen hanya untuk client side
});

const WhyOur = dynamic(() => import('./why'), {
  ssr: false, // Matikan SSR jika komponen hanya untuk client side
});

export default function Main() {
  return (
    <>
      <Navbar />
      <main
        className="
      px-[45px]
      lg:px-[200px] lg:py-[10px]
      "
      >
        <Hero />
        <About/>
        <Service/>
        <WhyOur/>
        
      </main>
      <Footer/>
    </>
  );
}
