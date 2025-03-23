"use client";


import Image from "next/image";

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";



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
                                    card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl py-[30px] px-[20px] flex flex-col justify-center

                                    lg:w-[260px] lg:h-[auto]

                                    hover:scale-[1.030] hover:shadow-md
                                    lg:hover:scale-[1.021] lg:hover:shadow-md
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
                                            w-[15vw] pointer-events-none select-none
                                            lg:w-[6vw]"
                                            />
                                        </div>
                                        <div className="text">
                                            <h2
                                            className="
                                            font-semibold text-[3.5vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                                            lg:text-[1.1vw] 
                                            ">
                                                {items.title}
                                            </h2>
                                            <p
                                            className="
                                            text-[2.6vw] text-[#4E4E4E] 
                                            md:text-[2.8vw]
                                            lg:text-[0.9vw]
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

                    className="text mt-[-70px] lg:w-[50%] lg:m-0">
                        <p
                        className="
                        text-[4vw] text-[#4E4E4E] font-semibold
                        md:text-[3.4vw]
                        lg:text-[1.2vw]
                        ">
                        Ini adalah layanan utama yang kami sediakan untuk membuat bisnis anda berevolusi dan tampil kreatif.
                        </p>
                    </m.div>
                </section>
        </LazyMotion>
        </>
    )
}