import Image from "next/image";

export default function Comming(){
    return(
        <>
            <Image
                    src="/images/hero/background.svg"
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                    className="
                    absolute top-0 right-0 opacity-[0.9] z-[-20]
                    md:opacity-[0.28]
                    lg:opacity-[0.3]
                    "
                />
            <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            {/* Logo */}
            <div className="mb-6">
            <Image
                src="images/logo.svg"
                alt="Creativolve Logo"
                width={200}
                height={200}
            />
            </div>
        
            <div
            className="
                heading text-center flex flex-col items-center gap-[14px]
                "
          >
            <h2
              className="
                    font-semibold text-[5vw] leading-[6vw] 
                    lg:text-[3vw] lg:leading-[3.7vw] 
                    "
            >
              Segera Hadir Untuk Membantu <br/> Bisnis Kamu Berkembang
            </h2>
            <p
              className="
                    w-[80%] text-[3vw]
                    lg:w-[55%] lg:text-[1vw]
                    "
            >
              Bangun Brand Digital Anda dengan Strategi Terbaik & Fleksibel
              dengan menerapkan sistem automasi.
            </p>
          </div>
        </section>
        </>
    )
}