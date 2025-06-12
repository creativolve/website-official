"use client"

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import FadeInWhenVisible from "./animation/FadeInWhenVisible";
import Image from "next/image";


const Navbar = dynamic(() => import("./navbar"), { ssr: true });
const Hero = dynamic(() => import("./hero"), { ssr: true });
const Card = dynamic(() => import("./card"), { ssr: false });
const Tentang = dynamic(() => import("./tentang"), { ssr: true });
const Layanan = dynamic(() => import("./layanan"), { ssr: true });
const Mengapa = dynamic(() => import("./mengapa"), { ssr: true });
const BlogSec = dynamic(() => import("./blogSec"), { ssr: true });
const PusatLaySec = dynamic(() => import("./pusatLaySec"), { ssr: true });
const Footer = dynamic(() => import("./footer"), { ssr: true });
const Loader = dynamic(() => import("./load"), { ssr: false });

export default function Main() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const loadAssets = async () => {
        await Promise.all([
          new Promise((resolve) => {
            const img = new window.Image(); // ✅ Native image
            img.src = "/images/logo.png";
            img.onload = resolve;
            img.onerror = resolve;
          }),
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);
        setIsLoading(false);
      };
    
      loadAssets();
    }, []);
  
    if (isLoading) return <Loader />;

    return(
        <div
        className="
        px-[40px]
        md:px-[100px]
        lg:px-[150px] lg:py-[20px]
        ">

            

        <Navbar/>
        <main>
          <Image
                                  src='/images/hero_section/circle.png'
                                  width={500}
                                  height={500}
                                  quality={80}
                                  priority
                                  alt="Circle"
                                  className="top-[480px] filter drop-shadow-[0_0_40px_#00E5FF] translate-y-[20%] w-[50vw] pointer-events-none select-none  right-0 absolute
                                  md:translate-y-[-20%] md:w-[50vw]
                                  lg:translate-y-[-65%] lg:w-[30vw]
                                  "
                                  />
        <FadeInWhenVisible>
          <Hero/>
        </FadeInWhenVisible>
            
        <FadeInWhenVisible delay={0.1}>
          <div className="
            container-card h-fit py-20 grid place-items-center gap-8 my-[70px]
            md:grid-cols-2 md:grid-rows-2 md:gap-15
            lg:grid-cols-4 lg:grid-rows-1
          ">
            <Card index={0}/>
            <Card index={1}/>
            <Card index={2}/>
            <Card index={3}/>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <Tentang />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.3}>
          <Layanan />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.4}>
          <Mengapa />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.5}>
          <BlogSec />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.6}>
          <PusatLaySec />
        </FadeInWhenVisible>


        </main>
        <Footer/>   
        <div className="z-[100] fixed bottom-0 left-0 w-full h-[80px] bg-[#17181a48] backdrop-blur-[5px] lg:h-[10px]
    [mask-image:linear-gradient(to_top,black,transparent)] 
    [webkit-mask-image:linear-gradient(to_top,black,transparent)]">
</div>

        </div>
    )
}