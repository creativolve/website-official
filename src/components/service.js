"use client";


import Image from "next/image";

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";

const buttonService = [
    {
        name: 'Layanan Bisnis',
        href: '/layanan-bisnis',
        solid: true,
    },
    {
        name: 'Layanan Umum',
        href: '/layanan-umum',
        solid: false,
    },
]

const cardData = [
    {
        "image": "/images/card/Brand Identity.png",
        "title": "Brand Identity",
        "paragraph": "Membangun identitas visual yang kuat dan unik agar bisnis Anda mudah dikenali."
    },
    {
        "image": "/images/card/Brand Positioning.png",
        "title": "Brand Positioning",
        "paragraph": "Menentukan strategi dan posisi bisnis Anda di pasar agar lebih kompetitif."
    },
    {
        "image": "/images/card/Story Telling.png",
        "title": "Storytelling Branding",
        "paragraph": "Mengomunikasikan nilai dan cerita unik brand Anda untuk menarik pelanggan."
    },
    {
        "image": "/images/card/Digital Marketing Ads.png",
        "title": "Digital Marketing Ads",
        "paragraph": "Strategi pemasaran digital yang efektif untuk lebih menjangkau audiens."
    }
]

export default function Service(){
    return(
        <>
        <LazyMotion features={domAnimation}>           
                <section
                id="layanan"
                className="
                h-[100vh] flex justify-center flex-col gap-[100px]
                md:h-[170vh]
                lg:h-[100vh]">
                    <div
                    className="container relative">
                        <m.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut'
                        }}
                        viewport={{once: true, amount: 0.2}}
                        >
                        

                            <Image
                            src="/images/layanan/background.svg"
                            alt="background"
                            width={100}
                            quality={60}
                            height={100}
                            className="
                            absolute top-[50%] right-[50%] translate-y-[-60%] z-[-2] translate-x-[50%] w-[110vw] select-none pointer-events-none
                            lg:w-[40vw]
                            "
                            />
                        </m.div>
                            <m.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                                staggerChildren: 0.2
                            }}
                            viewport={{once: true, amount: 0.2}}
                            className="container m-auto w-fit grid grid-cols-2 grid-rows-2 gap-[20px]">
                                {cardData.map((items, index) =>(
                                    <m.div key={index}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeInOut',
                                        delay: index * 0.5
                                    }}
                                    viewport={{once: true, amount: 0.2}}

                                    className="
                                    card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl py-[30px] px-[20px] flex flex-col justify-center transition-all duration-100

                                    lg:w-[260px] lg:h-[auto]

                                    hover:scale-[1.030] hover:shadow-md
                                    lg:hover:scale-[1.021] lg:hover:shadow-md hover:bg-[#262626] group hover:translate-y-[-20px]
                                    ">
                                        <div className="image">
                                            <Image
                                            src={items.image}
                                            alt={items.title}
                                            width={100}
                                            height={100}
                                            fetchPriority="high"
                                            loading="lazy"
                                            className="
                                            w-[15vw] pointer-events-none select-none transition-all duration-200 ease-in-out
                                            lg:w-[6vw]
                                            group-hover:invert
                                            "
                                            />
                                        </div>
                                        <div className="text">
                                            <h2
                                            className="
                                            font-semibold text-[3.5vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888] transition-all duration-200 ease-in-out
                                            lg:text-[1.1vw] 
                                            group-hover:invert
                                            ">
                                                {items.title}
                                            </h2>
                                            <p
                                            className="
                                            text-[2.6vw] text-[#4E4E4E] transition-all duration-200 ease-in-out
                                            md:text-[2.8vw] 
                                            lg:text-[0.9vw]
                                            group-hover:invert
                                            ">
                                                {items.paragraph}
                                            </p>
                                        </div>
                                    </m.div>
                                ))}
                            </m.div>
                    </div>
                    <m.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                        delay: 0.7
                    }}
                    viewport={{once: true, amount: 0.2}}

                    className="text mt-[-70px] flex flex-col gap-5 lg:w-[50%] lg:m-0">
                        <p
                        className="
                        text-[4vw] text-[#4E4E4E] font-semibold
                        md:text-[3.4vw]
                        lg:text-[1.2vw]
                        ">
                        Ini adalah layanan utama yang kami sediakan untuk membuat bisnis anda berkembang dan tampil kreatif, Lihat layanan kami secara rinci sesuai kategori!.
                        </p>
                        <div className="button flex gap-6">
                            {buttonService.map((items, index) => (
                                <Link key={index} href={items.href}>
                                <m.button
                                initial={{y: 50, opacity: 0}}
                                whileInView={{y: 0, opacity: 100}}
                                transition={{
                                    duration: 0.5, 
                                    delay: 0.8, 
                                    ease: 'easeInOut'}}
                                viewport={{once: true, amount: 0.3}}

                                className={`
                                px-[10px] py-[5px] rounded-3xl text-[3.4vw] cursor-pointe ease-in-out
                                md:text-[3vw]
                                lg:px-[25px] lg:py-[5px] lg:text-[1vw] transition-all duration-200
                                hover:translate-y-[-5px] cursor-pointer

                                ${items.solid ? 
                                    'bg-[#262626] text-white border-2 border-transparent hover:bg-transparent hover:text-[#262626] hover:border-[#262626]' 
                                    : 
                                    'bg-transparent border border-[#262626] text-black hover:bg-[#262626] hover:text-white'
                                }
                                    `}
                                >
                                    {items.name}
                                </m.button>
                                </Link>
                            ))}
                        </div>
                    </m.div>
                </section>
        </LazyMotion>
        </>
    )
}