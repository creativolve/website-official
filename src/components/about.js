"use client";

import Image from "next/image";
import Link from "next/link";

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";


const buttonAbout = [
    {
        name: 'Cari Tahu!',
        solid: '#070707',
        stroke: 'none',
        href: "/"
    },
    {
        name: 'Cari Tahu!',
        solid: 'transparent',
        stroke: '#070707',
        href: "/"
    }
]


export default function About(){


    return(
        <>
        <LazyMotion features={domAnimation}>           
            <section
            id="tentang"
            className="
            flex flex-col-reverse h-[150vh] 
            md:h-[150vh] 
            lg:flex-row justify-center items-center lg:h-[110vh] 
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
                          duration: 0.5, 
                          ease: 'easeInOut'}}
                        viewport={{once: true, amount: 0.3}}
                        className="
                        font-semibold text-[6.6vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                        lg:text-[2.4vw]
                        ">
                            Agensi Solusi Digital Dan Branding
                        </m.h2>
                        <m.p
                        initial={{y: 50, opacity: 0}}
                        whileInView={{y: 0, opacity: 100}}
                        transition={{
                          duration: 0.5, 
                          delay: 0.4, 
                          ease: 'easeInOut'}}
                        viewport={{once: true, amount: 0.3}}
                        className="
                        text-[4vw] text-[#4E4E4E]
                        lg:text-[1.2vw]
                        ">
                            Kami akan menjadi partner bisnis anda untuk berkembang dan lebih tampil kreatif dengan menerapkan sistem Automasi.
                        </m.p>
                    </div>
                    <m.div
                    initial={{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1,
                    transition: {
                        duration: 0.7, 
                        delay: 0.8, 
                        ease: 'easeInOut',
                        staggerChildren: 0.2
                                    }
                    }}
                    viewport={{once: true, amount: 0.2}}
                    className="
                    button flex gap-6
                    ">
                        {buttonAbout.map((item, index) =>(
                            <Link key={index} href={item.href}>
                                <m.button
                                initial={{pacity: 0, y: 50}}
                                whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    ease: "easeInOut",
                                    duration: 0.5,
                                    delay: index * 0.9
                                },
                                }}
                                viewport={{once: true, amount: 0.2}}
                                className={`
                                px-[20px] py-[5px] rounded-3xl text-[3.8vw]
                                lg:px-[25px] lg:py-[8px] lg:text-[1vw]
                                ${item.solid !== 'transparent' ? 'bg-[#070707] text-white' : 'bg-transparent'}
                                ${item.stroke !== 'none' ? 'border border-[#070707] text-[#070707]' : ''}
                                `}>
                                    {item.name}
                                </m.button>
                            </Link>
                        ))}
                    </m.div>
                </div>

                <m.div
                initial={{opacity: 0, y: 15}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    delay: 1.2
                }}
                viewport={{once: true, amount: 0.2}}
                className="
                image relative 
                lg:mb-[-180px]
                ">
                    <Image
                    src="/images/tentang/Hand_AI.png"
                    alt="AI"
                    width={400}
                    height={400}
                    quality={50}
                    fetchPriority="high"
                    loading="lazy"
                    className="
                    w-full pointer-events-none select-none
                    lg:w-[40vw]
                    "
                    />

                    <div 
                    className="
                    container absolute top-[-30px] 
                    ">
                        <m.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut'
                        }}
                        viewport={{once: true, amount: 0.2}}

                        className="
                        card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl w-fit px-[20px] py-[7px] translate-x-[2px] translate-y-[20px]

                        lg:translate-y-[85px] lg:translate-x-[105px] lg:px-[20px] lg:py-[9px] 
                        ">
                            <span
                            className="
                            text-[4vw] font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]

                            lg:text-[1.3vw]
                            ">
                                Masalah
                            </span>
                        </m.div>

                        <m.div 
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut',
                            delay: 0.8
                        }}
                        viewport={{once: true, amount: 0.2}}

                        className="
                        card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl w-fit px-[20px] py-[7px] translate-x-[70px] translate-y-[-80px]
                        
                        lg:px-[20px] lg:py-[9px] lg:translate-y-[-50px] lg:translate-x-[245px]
                        ">
                            <span
                            className="
                            text-[4vw] font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]

                            lg:text-[1.3vw]
                            ">
                                Solusi
                            </span>
                        </m.div>

                        <m.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut',
                            delay: 1
                        }}
                        viewport={{once: true, amount: 0.2}}
                            
                        className="
                        card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl w-fit px-[20px] py-[7px] translate-x-[140px] translate-y-[-50px]
                        
                        lg:px-[20px] lg:py-[9px] lg:translate-y-[-20px] lg:translate-x-[345px]
                        ">
                            <span
                            className="
                            text-[4vw] font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]

                            lg:text-[1.3vw]
                            ">
                                Strategi
                            </span>
                        </m.div>



                    </div>
                </m.div>
            </section>
        </LazyMotion>
        </>
    )
}