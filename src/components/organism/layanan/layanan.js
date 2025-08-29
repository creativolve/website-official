import CardSwap, { Card } from "@/components/atoms/animation/cardSwap";
import FadeIn from "@/components/atoms/animation/fadein";
import TrueFocus from "@/components/atoms/animation/trueFocus";
import GradientButton from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";
import Image from "next/image";




export default function Layanan() {
  const cardsData = [
    {
      title: "Desain Grafis",
      image: "/image/layanan/desain-grafis.jpg",
    },
    {
      title: "Web Development",
      image: "/image/layanan/developer.jpg",
    },
    {
      title: "Digital Branding",
      image: "/image/layanan/digital-branding.jpg",
    },
    {
      title: "Video Editing",
      image: "/image/layanan/editor video.jpg",
    },
  ];

  return (
    <section
      id="layanan"
      className="relative h-[140dvh] lg:h-screen flex flex-col overflow-hidden lg:flex-row"
    >
      {/* Bagian Teks */}
      <div className="w-full flex flex-col justify-center items-start p-10 gap-10 lg:p-16 lg:w-[50%]">
        <TrueFocus
          sentence="Fleksibel And Client-Centric"
          manualMode={false}
          blurAmount={5}
          borderColor="white"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />

        <FadeIn>
          <H2>Solusi Digital Dengan Fleksibilitas Untuk Setiap Kalangan!</H2><br />
          <GradientButton href='/layanan'>
            Lihat Lengkapnya!
          </GradientButton>
        </FadeIn>
      </div>

      {/* Bagian Card */}
<div
  className="
    relative
    w-full lg:w-1/2 flex justify-center items-center translate-x-[1vw]
    translate-y-[27vh]   
    md:translate-y-[50vh]  md:translate-x-[20vw] 
    lg:translate-y-[40vh] lg:translate-x-[10vw]  
    xl:translate-y-[40vh] 
  "
>
  <FadeIn>
    <CardSwap pauseOnHover={false} verticalDistance="70">
      {cardsData.map((card, index) => (
<Card
  key={index}
  className="rounded-xl shadow-lg overflow-hidden flex flex-col items-center"
>
  <div className="w-full aspect-square relative">
    {/* Judul */}


    {/* Gambar */}
    <Image
      src={card.image}
      alt={card.title}
      fill
      className="object-cover pointer-events-none select-none"
      sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 50vw, 
             33vw"
      quality={40}
    />


  </div>
</Card>

      ))}
    </CardSwap>
  </FadeIn>
</div>
 

    </section>
  );
}
