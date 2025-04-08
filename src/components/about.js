"use client";

import Image from "next/image";
import Link from "next/link";

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";


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
            flex flex-col-reverse h-[100vh] pt-[35vw] 
            md:h-[190vh] lg:p-0
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
                            type: 'spring',
                            stiffness: 120,
                            damping: 12,}}
                        viewport={{once: true, amount: 0.3}}
                        className="
                        font-semibold text-[6.6vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                        md:text-[5vw]
                        lg:text-[2.4vw]
                        ">
                            Agensi Solusi Digital Dan Branding
                        </m.h2>
                        <m.p
                        initial={{y: 50, opacity: 0}}
                        whileInView={{y: 0, opacity: 100}}
                        transition={{
                            type: 'spring',
                            stiffness: 120,
                            damping: 12,}}
                        viewport={{once: true, amount: 0.3}}
                        className="
                        text-[4vw] text-[#4E4E4E]
                        md:text-[3.4vw]
                        lg:text-[1.2vw]
                        ">
                            Kami akan menjadi partner bisnis anda untuk berkembang dan tampil lebih kreatif <i
                            className="
                            text-[#383838]
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
                        stiffness: 120,
                        damping: 12,
                                    }
                    }}
                    viewport={{once: true, amount: 0.2}}
                    className="
                    button flex gap-6
                    ">
                        {buttonAbout.map((item, index) =>(
                            <Link key={index} href={item.href} target="_blank" data-nonsnipet>
                                <m.button
                                data-nonsnipet
                                initial={{pacity: 0, y: 50}}
                                whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: 'spring',
                                    stiffness: 120,
                                    damping: 12,
                                },
                                }}
                                viewport={{once: true, amount: 0.2}}
                                className={`
                                px-[20px] py-[5px] rounded-3xl text-[3.8vw] cursor-pointer border-2 border-transparent bg-[#262626] text-white 
                                md:text-[3vw]
                                lg:px-[25px] lg:py-[5px] lg:text-[1vw] transition-all duration-100 ease-in-out
                                
                                hover:bg-transparent hover:text-[#262626] hover:border-[#262626] hover:translate-y-[-5px] 

                                active:bg-transparent active:text-[#262626] active:border-[#262626] active:translate-y-[-5px] 
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
                    type: 'spring',
                    stiffness: 120,
                    damping: 12,
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
                    md:w-[100vw]
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
                            type: 'spring',
                            stiffness: 120,
                            damping: 12,
                        }}
                        viewport={{once: true, amount: 0.2}}

                        className="
                        card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl w-fit px-[20px] py-[7px] translate-x-[2px] translate-y-[20px] transition-all duration-200

                        md:translate-x-[0px] md:translate-y-[40px]

                        lg:translate-y-[85px] lg:translate-x-[105px] lg:px-[20px] lg:py-[9px]

                        hover:bg-[#262626] group
                        active:bg-[#262626] group
                        ">
                            <span
                            className="
                            text-[4vw] font-bold text-black pointer-events-none select-none


                            lg:text-[1.3vw]

                            group-hover:text-white !important
                            group-active:text-white
                            ">
                                Masalah
                            </span>
                        </m.div>

                        <m.div 
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            type: 'spring',
                            stiffness: 120,
                            damping: 12,
                        }}
                        viewport={{once: true, amount: 0.2}}

                        className="
                        card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl w-fit px-[20px] py-[7px] translate-x-[70px] translate-y-[-80px] transition-all duration-200

                        md:translate-x-[150px] md:translate-y-[-130px]
                        
                        lg:px-[20px] lg:py-[9px] lg:translate-y-[-50px] lg:translate-x-[245px]

                        hover:bg-[#262626] group
                        active:bg-[#262626] group
                        ">
                            <span
                            className="
                            text-[4vw] font-bold text-black pointer-events-none select-none

                            lg:text-[1.3vw]

                            group-hover:text-white !important
                            group-active:text-white
                            ">
                                Solusi
                            </span>
                        </m.div>

                        <m.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            type: 'spring',
                            stiffness: 120,
                            damping: 12,
                        }}
                        viewport={{once: true, amount: 0.2}}
                            
                        className="
                        card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl w-fit px-[20px] py-[7px] translate-x-[140px] translate-y-[-50px] transition-all duration-200

                        md:translate-x-[300px] md:translate-y-[-90px]
                        
                        lg:px-[20px] lg:py-[9px] lg:translate-y-[-20px] lg:translate-x-[345px]
                        
                        hover:bg-[#262626] group
                        active:bg-[#262626] group
                        ">
                            <span
                            className="
                            text-[4vw] font-bold pointer-events-none select-none


                            lg:text-[1.3vw]

                            group-hover:text-white !important
                            group-active:text-white
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