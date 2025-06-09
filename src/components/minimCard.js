import Image from "next/image"

const contentCard = [
    {
        heading: 'Layanan 24 Jam',
        Paragraft: 'Kapanpun Asisten Digital kami siap mebantu!'
    },
    {
        heading: 'Solusi yang konkret',
        Paragraft: 'Certitakan masalah digital mu dan dapatkan  solusi yang knkret!'
    },
    {
        heading: 'pengetahuan digital',
        Paragraft: 'kamu bisa belajar terkait dunia digital dengan Asisten Digital Kami!'
    },
]

export default function MinimCard(){

    return(
        <div
        className="
        grid grid-cols-1 space-y-5 gap-5 place-items-center
        md:grid-cols-3 md:space-x-5 md:place-items-stretch
        ">
        {contentCard.map((item, index) => (

            <div
            key={index}
                    className="card bg-[#21252C] w-[100%] h-full flex flex-col justify-center items-start space-y-4 px-[20px] py-[25px] rounded-[20px] relative overflow-hidden shadow-xl shadow-[#00000074]
            
                    md:w-[20vw]
                    lg:w-[18vw]
                    "
                >
                    <Image
                    src="/images/card/circle.png"
                    width={300}
                    height={300}
                    priority
                    quality={100}
                    alt="lightning"
                    className={`absolute  w-[500px] opacity-[0.7] blur-2xl bottom-[-30vw] right-[-40vw] select-none pointer-events-none
            
                        md:bottom-[-15vw] md:right-[-0vw]
                        lg:bottom-[-15vw] lg:right-[-80]
                        `}
                    />
                    <div className="text">
                    <h2
                        className={`
                            text-left
                                text-[clamp(0.9rem,2vw,1rem)]
                                font-semibold text-white
                            `}
                    >
                        {item.heading}
                    </h2>
            
                    <p
                        className={`
                            text-[clamp(0.7rem,1.6vw,0.8rem)]
                            text-[#b6b6b6] z-[2] text-left
                        `}
                    >
                        {item.Paragraft}
                    </p>
                    </div>
                </div>
        ))}
        </div>
    )
}