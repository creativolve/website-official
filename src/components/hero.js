"use client";

import "@/css/animate.css"
import Image from "next/image";
import Link from "next/link";
import Card from "./card";
import Button from "./button";

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";


export default function Hero() {

  return (
    <header
    className="
    py-36
    lg:h-[100vh]
    "
    >
      <LazyMotion features={domAnimation}>
          <Image
            src="/images/hero/background.png"
            alt="background"
            width={300}
            height={300}
            quality={40}
            priority
            className="
            absolute top-0 left-0 w-full h-[100vh] opacity-10 z-[-20]
            lg:w-full lg:opacity-25 lg:h-auto
            "
            
          />
            <div
              className="
                typografi flex flex-col items-center gap-8 justify-center z-[-2]
                "
            >
              <div
                className="
                    heading text-center flex flex-col items-center gap-[25px] lg:w-[80%]
                    "
              >
                <m.h1
                initial={{y: 50, opacity: 0}}
                whileInView={{y: 0, opacity: 100}}
                transition={{
                  type: 'spring',
                  stiffness: 60,
                  damping: 12,
                  duration: 0.5, 
                  ease: 'easeInOut'}}
                viewport={{once: true}}
                  className="
                    animated-gradient-white animated-gradient text-transparent bg-clip-text
                        font-bold text-[8vw] leading-[9vw]
                        md:text-[7vw] md:leading-[7.1vw]
                        lg:text-[3.3vw] lg:leading-[3.7vw] 
                        "
                >
                  Jangan Biarkan Budget Menjadi Penghambat!
                </m.h1>
                <m.p
                  initial={{y: 50, opacity: 0}}
                  whileInView={{y: 0, opacity: 100}}
                  transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 12,
                    duration: 0.5, 
                    delay: 0.4, 
                    ease: 'easeInOut'}}
                  viewport={{once: true}}
                  className="
                        w-[100%] text-[4vw] text-[#cccccc] normal-case
                        md:text-[3.3vw]
                        lg:w-[55%] lg:text-[1.2vw]
                        "
                >
                    Kami siap jadi partner terbaik bisnis Anda dengan solusi fleksibel dan terjangkau.
                    Diskusikan Masalah Anda Sekarang!

                </m.p>
                <Button name="Ayo Diskusikan!" href="/#diskusi"/>
              </div>

              
            </div>

          <div
            className="
                  flex flex-col justify-between items-center gap-10 
                  lg:flex-row mt-[17vh]
                  "
          >
            <div
              className="
                    digital-marketing w-full
                    lg:mt-[-130px] lg:ml-0
                    "
            >
              <Card index={0} />
            </div>

            <div
              className="
                    digital-branding w-full
                    lg:m-0
                    "
            >
              <Card index={1} />
            </div>

            <div
              className="
                    digital-ads w-full
                    lg:mt-[-190px] lg:ml-0
                    "
            >
              <Card index={2} />
            </div>

            <div
              className="
                    digital-solution w-full
                    lg:m-0
                    "
            >
              <Card index={3} />
            </div>
          </div>
      </LazyMotion>
    </header>
  );
}
