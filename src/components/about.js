"use client";

import Image from "next/image";
import Link from "next/link";


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
        <section
        id="tentang"
        className="
        flex flex-col-reverse h-[110vh] 
        md:h-[150vh] 
        lg:flex-row justify-center items-center lg:h-[100vh] 
        ">
            <div 
            className="
            heading flex flex-col gap-7
            lg:w-[40%]
            ">
                <div className="text">
                    <h2
                    className="
                    font-semibold text-[6.6vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                    lg:text-[2.4vw]
                    ">
                        Agensi Solusi Digital Dan Branding
                    </h2>
                    <p
                    className="
                    text-[4vw] text-[#4E4E4E]
                    lg:text-[1.2vw]
                    ">
                        Kami akan menjadi partner bisnis anda untuk berkembang dan lebih tampil kreatif dengan menerapkan sistem Automasi.
                    </p>
                </div>
                <div
                className="
                button flex gap-6
                ">
                    {buttonAbout.map((item, index) =>(
                        <Link key={index} href={item.href}>
                            <button
                            className={`
                            px-[20px] py-[30px] rounded-3xl
                            lg:px-[25px] lg:py-[8px]
                            ${item.solid !== 'transparent' ? 'bg-[#070707] text-white' : 'bg-transparent'}
                            ${item.stroke !== 'none' ? 'border border-[#070707] text-[#070707]' : ''}
                            `}>
                                {item.name}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>

            <div 
            className="
            image relative 
            lg:mb-[-180px]
            ">
                <Image
                src="/images/tentang/Hand_AI.svg"
                alt="AI"
                width={100}
                height={100}
                quality={60}
                className="
                w-full
                "
                />

                <div 
                className="
                container absolute top-[-30px] 
                ">
                    <div className="
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
                    </div>

                    <div className="
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
                    </div>

                    <div className="
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
                    </div>



                </div>
            </div>
        </section>
        </>
    )
}