"use client";


import Image from "next/image";

const cardData = [
    {
        "image": "/images/card/Brand Identity.svg",
        "title": "Brand Identity",
        "paragraph": "Membangun identitas visual yang kuat dan unik agar bisnis Anda mudah dikenali."
    },
    {
        "image": "/images/card/Brand Positioning.svg",
        "title": "Brand Positioning",
        "paragraph": "Menentukan strategi dan posisi bisnis Anda di pasar agar lebih kompetitif."
    },
    {
        "image": "/images/card/Story Telling.svg",
        "title": "Storytelling Branding",
        "paragraph": "Mengomunikasikan nilai dan cerita unik brand Anda untuk menarik pelanggan."
    },
    {
        "image": "/images/card/Digital Marketing Ads.svg",
        "title": "Digital Marketing Ads",
        "paragraph": "Strategi pemasaran digital yang efektif untuk lebih menjangkau audiens."
    }
]

export default function Service(){
    return(
        <section
        id="layanan"
        className="
        h-[100vh] flex justify-center flex-col gap-[100px]
        lg:h-[100vh]">
            <div className="image-container relative">
                <Image
                src="/images/layanan/background.svg"
                alt="background"
                width={100}
                quality={60}
                height={100}
                className="
                absolute top-[50%] right-[50%] translate-y-[-60%] z-[-2] translate-x-[50%] w-[110vw]
                lg:w-[40vw]
                "
                />
                <div className="background">
                    <div className="container m-auto w-fit grid grid-cols-2 grid-rows-2 gap-[20px]">
                        {cardData.map((items, index) =>(
                            <div key={index}
                            className="
                            card bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl py-[30px] px-[20px] flex flex-col justify-center w-[130px] h-[200px]

                            lg:w-[260px] lg:h-[auto]
                            ">
                                <div className="image">
                                    <Image
                                    src={items.image}
                                    alt={items.title}
                                    width={100}
                                    height={100}
                                    className="
                                    w-[15vw]
                                    lg:w-[6vw]"
                                    />
                                </div>
                                <div className="text">
                                    <h3
                                    className="
                                    font-semibold text-[3.5vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                                    lg:text-[1.1vw] 
                                    ">
                                        {items.title}
                                    </h3>
                                    <p
                                    className="
                                    text-[2.6vw] text-[#4E4E4E] 
                                    md:text-[2.8vw]
                                    lg:text-[0.9vw]
                                    ">
                                        {items.paragraph}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text mt-[-70px] lg:w-[50%] lg:m-0">
                <p
                className="
                text-[4vw] text-[#4E4E4E] font-semibold
                lg:text-[1.2vw]
                ">
                Ini adalah layanan utama yang kami sediakan untuk membuat bisnis anda berevolusi dan tampil kreatif.
                </p>
            </div>
        </section>
    )
}