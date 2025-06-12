import Image from "next/image";

const cardItems = [
  {
    image: "/images/card/Digital Marketing.png",
    title: "Digital Marketing",
    paragraph: "Perkenalkan brand mu ke seluruh audiens.",
  },
  {
    image: "/images/card/Digital Branding.png",
    title: "Digital Branding",
    paragraph: "Buat identitas brand mu menjadi lebih profesional.",
  },
  {
    image: "/images/card/Digital Ads.png",
    title: "Digital Ads",
    paragraph: "Buat klien menemukan solusi masalah mereka.",
  },
  {
    image: "/images/card/Digital Solution.png",
    title: "Digital Solution",
    paragraph: "Temukan masalah kamu dengan pemanfaatan teknologi digital",
  },
  {
    image: "/images/card/Brand Identity.png",
    title: "Brand Identity",
    paragraph:
      "Membangun identitas visual yang kuat dan unik agar bisnis Anda mudah dikenali.",
  },
  {
    image: "/images/card/Brand Positioning.png",
    title: "Brand Positioning",
    paragraph:
      "Menentukan strategi dan posisi bisnis Anda di pasar agar lebih kompetitif.",
  },
  {
    image: "/images/card/Story Telling.png",
    title: "Storytelling Branding",
    paragraph:
      "Mengomunikasikan nilai dan cerita unik brand Anda untuk menarik pelanggan.",
  },
  {
    image: "/images/card/Digital Marketing Ads.png",
    title: "Digital Marketing Ads",
    paragraph:
      "Strategi pemasaran digital yang efektif untuk lebih menjangkau audiens.",
  },
];

export default function Card({ index }) {
  const item = cardItems[index];
  const serviceSection = index >= 4 && index <= 7;

  return (
    <>
      <div
        className="card bg-[#21252C] w-[100%] h-full flex flex-col justify-center items-start space-y-4 px-[20px] py-[25px] rounded-[20px] relative overflow-hidden shadow-xl shadow-[#00000074]

        md:w-[37vw]
        lg:w-[18vw]
        "
      >
        <Image
          src="/images/card/circle.png"
          width={300}
          height={300}
          priority
          quality={75}
          alt="lightning"
          className={`absolute  w-[500px] opacity-[0.7] blur-2xl select-none pointer-events-none
            ${
                serviceSection
                ? 'bottom-[-10vw] right-[-10vw]'
                : 'bottom-[-40vw] right-[-40vw]'
            }

            md:bottom-[-25vw] md:right-[-20vw]
            lg:bottom-[-15vw] lg:right-[-100]
            `}
        />
        <div className="image W-[full] z-[2]">
          <Image
            src={item.image}
            alt={item.title}
            width={500}
            height={500}
            quality={80}
            className={`
                ${
                    serviceSection
                    ? 'w-[clamp(4rem,5vw,30rem)]'
                    : 'w-[clamp(5rem,5vw,30rem)]'
                }
                    lg:aspect-square
                `}
          />
        </div>
        <div className="text">
          <h2
            className={`
                    ${
                    serviceSection
                        ? "text-[clamp(0.8rem,2vw,0.9rem)]"
                        : "text-[clamp(0.9rem,2vw,1rem)]"
                    }
                    font-semibold text-white
                `}
          >
            {item.title}
          </h2>

          <p
            className={`
                ${
                    serviceSection
                    ? 'text-[clamp(0.6rem,1.6vw,0.8rem)]'
                    : 'text-[clamp(0.7rem,1.6vw,0.8rem)]'
                }
                text-[#b6b6b6] z-[2]
            `}
          >
            {item.paragraph}
          </p>
        </div>
      </div>
    </>
  );
}
