"use client";

import Navbar from "./navbar";
import Hero from "./hero";
import About from "./about";
import Service from "./service";
import WhyOur from "./why";
import Footer from "./footer";

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
