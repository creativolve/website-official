"use client";

import Image from "next/image";

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
    title: "Menerapkan Sistem Konsultasi Unik",
    paragraph:
      "Selain memeberikan layanan konsultasi secara teknis dan profesional, kami memberikan layanan konsultasi berbasis AI.",
  },
  {
    number: "3",
    title: "Memberikan Solusi Digital Berbasis Big Data",
    paragraph:
      "Kami memberikan solusi digital dari hasil kesimpulan riset dari sistem ‘Big Data’.",
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
                    text-white font-semibold text-[6.6vw] 
                    md:text-[5.3vw]
                    lg:text-[2.4vw]
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
                                    font-semibold text-[#ffffff]
                                    md:text-[4vw]
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
