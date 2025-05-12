"use client";

import Image from "next/image";
import cardData from "@/data/card_data.json";
import "@/css/animate.css"

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Card({ index }) {
  const item = cardData[index];

  if (!item) return <p>Data tidak ditemukan</p>;

  return (
    <>
        <LazyMotion features={domAnimation}>
            <m.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0,
                transition: {
                    type: 'spring',
                    stiffness: 120,
                    damping: 12,
                }
            }}
            viewport={{once: true, amount: 0.1}}
            >


                <m.div 
                initial={{opacity: 0, y: 20}}
                whileInView={{
                    opacity: 1, y: 0,
                    transition: {
                        type: 'spring',
                        stiffness: 120,
                        damping: 12,
                    }
                }}
                viewport={{once: true, amount: 0.1}}
                className="
                bg-[#262626] shadow-[3px_6px_18px_rgba(0,0,0,0.9)] rounded-2xl gap-2 items-center ransition-all duration-200 ease-in-out w-[100%] m-auto py-8 px-3 justify-center 

                md:w-[90%]  md:py-12 md:px-16

                lg:flex lg:flex-col lg:w-[15vw]
                hover:scale-[1.030] hover:shadow-[3px_6px_25px_rgba(0,0,0,0.9)]
                lg:hover:scale-[1.021] lg:py-7 lg:px-3 
                
                hover:bg-[#ffffff] group hover:translate-y-[-20px]

                active:bg-[#ffffff] active:translate-y-[-20px]
                ">
            
                    <div 
                    className="
                    image w-[80%]

                    ">
                        <Image
                        alt={item.title}
                        src={item.image}
                        width={120}
                        height={120}
                        quality={10}
                        fetchPriority="high"
                        loading="lazy" 
                        className="
                        w-[25vw] pointer-events-none select-none transition-all duration-100 ease-in-out
                        md:w-[20vw] 
                        lg:w-[6vw]

                        group-hover:invert
                        group-active:invert
                        "
                        />
                    </div>
                    <div
                    className="
                    text w-[80%]
                    ">
                        <h2
                        className="
                        font-semibold text-[4.5vw] ransition-all duration-100 ease-in-out
                        md:text-[4vw]
                        lg:text-[1.3vw]

                                            animated-gradient-blue animated-gradient text-transparent bg-clip-text

                        group-hover:invert
                        group-active:invert
                        ">
                            {item.title}
                        </h2>
                        <p
                        className="
                        text-[3.3vw] text-[#cccccc] transition-all duration-100
                        md:text-[2.8vw]
                        lg:text-[0.9vw]

                        group-hover:invert
                        group-active:invert
                        ">
                            {item.paragraph}
                        </p>
                    </div>
                </m.div>

            </m.div>
        </LazyMotion>
    </>
  );
}
