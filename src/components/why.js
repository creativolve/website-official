"use client";

import Image from "next/image";
import "@/css/animate.css"

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";

const theList = [
  {
    number: "1",
    title: "Fleksibel Sesuai Budget",
    paragraph:
      "Kami menerapkan sistem Budget-Based Costumization yang dimana kami menyesuaikan project dengan budget yang dimiliki.",
  },
  {
    number: "2",
    title: "Layanan Lengkap dalam Satu Atap",
    paragraph:
      "Kami menyediakan layanan digital secara menyeluruh mulai dari branding, digital marketing, desain konten, hingga pengembangan website dan SEO dalam satu ekosistem yang terintegrasi.",
  },
  {
    number: "3",
    title: "Pendekatan Kolaboratif dan Inovatif",
    paragraph:
      "Kami mengutamakan kolaborasi dan inovasi dalam setiap proses kerja. Lebih dari sekadar vendor, kami akan berperan sebagai partner dalam perjalanan bisnis Anda dan berkembang bersama",
  },
  {
    number: "4",
    title: "Solusi Digital yang Skalabel",
    paragraph:
      "Kami membangun solusi digital yang skalabel dan siap mengikuti perkembangan teknologi, sehingga bisnis Anda bisa terus bertumbuh dan relevan di era digital yang terus berubah.",
  },
];

export default function whyOur() {
  return (
    <>
     <LazyMotion features={domAnimation}>
        <section
          id="mengapa"
          className="
            flex flex-col items-center justify-center
            h-fit py-18 my-[150px] gap-20
            lg:flex-row
            "
        >
          <m.div
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0,
            transition: {
              type: 'spring',
              stiffness: 60,
              damping: 12,
            }
          }}
          viewport={{once: true, amount: 0.2}}
            className="
                image w-full
                lg:w-[60%]
                "
          >
            <Image
              src="/images/Mengapa/image.jpg"
              width={380}
              height={380}
              quality={90}
              alt="Why Our"
              fetchPriority="high"
              loading="lazy"
              className="
                    w-full select-none pointer-events-auto shadow-[5px_10px_25px_rgba(0,0,0,1)] rounded-[5vw]
                    md:w-[65%] transition-all duration-200 
                    lg:w-[70%] lg:m-0 lg:rounded-[2vw]

                    hover:scale-[1.04] hover:shadow-[5px_10px_45px_rgba(0,0,0,0.1]
                    "
            />
          </m.div>

          <div
            className="
                text flex flex-col gap-[40px]
                lg:w-[40%] lg:gap-[20px]
                "
          >
            <m.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y:0}}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 12,
            }}
            viewport={{once: true, amount: 0.2}}
              className="
                    font-semibold text-[6.6vw] 
                    md:text-[5vw]
                    lg:text-[2.4vw]
                                            animated-gradient-white animated-gradient text-transparent bg-clip-text

                    "
            >
              Alasan Kenapa Harus Memilih Kami
            </m.h2>
            <m.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y:0}}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 12,
            }}
            viewport={{once: true, amount: 0.2}}
              className="
                    container-list flex flex-col gap-5
                    "
            >
              {theList.map((item, index) => (
                <div
                  key={index}
                  className="
                            list flex gap-5
                            group
                            "
                >
                  <m.span
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 12,
                  }}
                  viewport={{once: true, amount: 0.2}}
                    className="
                    bg-[#ffffff] text-[#262626] font-bold rounded-2xl text-center flex justify-center items-center
                    min-w-[40px] h-[40px] text-[4vw] transition-all duration-200 ease-in-out
                    md:text-[5vw] md:min-w-[60px] md:h-[60px]
                    lg:min-w-[45px] lg:h-[45px] lg:text-[1vw]

                    group-hover:translate-y-[-20px] group-hover:scale-[1.13]
                    group-active:translate-y-[-20px] group-active:scale-[1.13]
                    "
                  >
                    {item.number}
                  </m.span>

                  <m.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 60,
                      damping: 12,
                    }
                  }}
                  viewport={{once: true, amount: 0.2}}
                    className="
                                text flex flex-col transition-all duration-200 ease-in-out
                                group-hover:translate-y-[-20px]
                                group-active:translate-y-[-20px]
                                "
                  >
                    <m.h3
                      initial={{opacity: 0, y: 20}}
                      whileInView={{opacity: 1, y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 60,
                          damping: 12,
                        }
                      }}
                      viewport={{once: true, amount: 0.2}}

                      className="
                                    font-semibold text-[#ffffff] text-[4.1  vw]
                                    md:text-[3.5vw]
                                    lg:text-[1.3vw]
                                    "
                    >
                      {item.title}
                    </m.h3>
                    <m.p
                      initial={{opacity: 0, y: 20}}
                      whileInView={{opacity: 1, y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 60,
                          damping: 12,
                        }
                      }}
                      viewport={{once: true, amount: 0.2}}
                      className="
                                    text-[4vw] text-[#cccccc]
                                    md:text-[3.4vw]
                                    lg:text-[1.2vw]
                                    "
                    >
                      {item.paragraph}
                    </m.p>
                  </m.div>
                </div>
              ))}
            </m.div>
          </div>
        </section>
     </LazyMotion>
    </>
  );
}
