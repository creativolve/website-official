"use client";


import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Navbar = dynamic(() => import('./navbar'), {ssr: true});
const About = dynamic(() => import('./about'), {ssr: true});
const Service = dynamic(() => import('./service'), {ssr: true});
const Footer = dynamic(() => import('./footer'), {ssr: false});
const Hero = dynamic(() => import('./hero'), {ssr: true});
const WhyOur = dynamic(() => import('./why'), {ssr: true});

const Loader = dynamic(() => import("./load"), { ssr: false });

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;
 

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
