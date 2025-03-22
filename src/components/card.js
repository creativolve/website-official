"use client";

import Image from "next/image";
import cardData from "@/data/card_data.json";

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
                    duration: 0.5,
                    ease: 'easeInOut',
                    delay: 1.6,
                    staggerChildren: 0.2
                }
            }}
            viewport={{once: true, amount: 0.1}}
            >


                <m.div 
                initial={{opacity: 0, y: 20}}
                whileInView={{
                    opacity: 1, y: 0,
                    transition: {
                        duration: 0.5,
                        delay: index * 0.3,
                        ease: 'easeInOut',
                    }
                }}
                viewport={{once: true, amount: 0.1}}
                className="
                bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl gap-2 items-center ransition-all duration-100 ease-in-out w-[100%] m-auto py-8 px-3 justify-center

                md:w-[90%]  md:py-12 md:px-16

                lg:flex lg:flex-col lg:w-[15vw]
                hover:scale-[1.030] hover:shadow-md
                lg:hover:scale-[1.021] lg:hover:shadow-md lg:py-7 lg:px-3
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
                        w-[25vw] pointer-events-none select-none
                        md:w-[20vw]
                        lg:w-[6vw]"
                        />
                    </div>
                    <div
                    className="
                    text w-[80%]
                    ">
                        <h3
                        className="
                        font-semibold text-[4.5vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                        md:text-[4vw]
                        lg:text-[1.3vw]
                        ">
                            {item.title}
                        </h3>
                        <p
                        className="
                        text-[3.3vw] text-[#4E4E4E] 
                        md:text-[2.8vw]
                        lg:text-[0.9vw]
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
