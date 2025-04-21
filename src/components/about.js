"use client";

import Image from "next/image";
import Link from "next/link";

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";
import Button from "./button";


const buttonAbout = [
    {
        name: 'Tentang Kita!',
        solid: '#070707',
        stroke: 'none',
        href: "/tentang"
    },
]


export default function About(){


    return(
        <>
        <LazyMotion features={domAnimation}>           
            <section
            id="tentang"
            className="
            flex flex-col-reverse h-fit py-66 justify-center gap-30
            items-center lg:justify-between
            lg:flex-row 
            ">
                <div 
                className="
                heading flex flex-col gap-7
                lg:w-[40%]
                ">
                    <div className="text">
                        <m.h2
                        initial={{y: 50, opacity: 0}}
                        whileInView={{y: 0, opacity: 100}}
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 12,}}
                        viewport={{once: true, amount: 0.3}}
                        className="
                        font-semibold text-[6.6vw] text-white
                        md:text-[5vw]
                        lg:text-[2.4vw]
                        ">
                            Agensi Solusi Digital Kreatif
                        </m.h2>
                        <m.p
                        initial={{y: 50, opacity: 0}}
                        whileInView={{y: 0, opacity: 100}}
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 12,}}
                        viewport={{once: true, amount: 0.3}}
                        className="
                        text-[4vw] text-[#cccccc]
                        md:text-[3.4vw]
                        lg:text-[1.2vw]
                        ">
                            Kami akan menjadi partner bisnis anda untuk berkembang dan tampil lebih kreatif <i
                            className="
                            text-[#ffffff]
                            ">
                                &apos;Tanpa Mengkhawatirkan Budget Anda&apos;.
                            </i>
                        </m.p>
                    </div>
                    <m.div
                    initial={{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1,
                    transition: {
                        type: 'spring',
                        stiffness: 60,
                        damping: 12,
                                    }
                    }}
                    viewport={{once: true, amount: 0.2}}
                    className="
                    button flex gap-6
                    ">
                     <Button name="Tentang Kami!" href="/tentang"/>
                    </m.div>
                </div>

                <m.div
                initial={{opacity: 0, y: 15}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 12,
                }}
                viewport={{once: true, amount: 0.2}}
                className="
                image w-full
                lg:w-[35%]
                ">
                    <Image
                    src="/images/tentang/image.jpg"
                    alt="AI"
                    width={900}
                    height={900}
                    quality={100}
                    fetchPriority="high"
                    loading="lazy"
                    className="
                    w-full  shadow-[5px_10px_25px_rgba(0,0,0,1)] rounded-[5vw] object-cover ransition-all duration-200 ease-in-out
                    lg:rounded-[2vw]

                    hover:scale-[1.04] hover:shadow-[5px_10px_45px_rgba(0,0,0,0.1]
                    "   
                    />  
                </m.div>
            </section>
        </LazyMotion>
        </>
    )
}