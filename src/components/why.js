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
            h-[150vh] my-[150px]
            md:h-[200vh]
            lg:h-[130vh] lg:flex-row
            "
        >
          <m.div
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0,
            transition: {
              duration: 0.6,
              ease: 'easeInOut',
            }
          }}
          viewport={{once: true, amount: 0.2}}
            className="
                image w-[100vw]
                lg:w-[60%]
                "
          >
            <Image
              src="/images/Mengapa/why.png"
              width={380}
              height={380}
              quality={90}
              alt="Why Our"
              fetchPriority="high"
              loading="lazy"
              className="
                    w-[85vw] ml-[-100px] select-none pointer-events-auto
                    md:w-[65%] transition-all duration-200 ease-in-out
                    lg:w-[70%] lg:m-0

                    hover:translate-y-[-40px] hover:scale-[1.05]
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
              duration: 0.5,
              ease: 'easeInOut'
            }}
            viewport={{once: true, amount: 0.2}}
              className="
                    bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888] font-semibold text-[7vw]
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
              duration: 0.5,
              ease: 'easeInOut',
              staggerChildren: 0.2
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
                            "
                >
                  <m.span
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    delay: index * 0.4
                  }}
                  viewport={{once: true, amount: 0.2}}
                    className="
                    bg-[#212121] text-white font-bold rounded-2xl text-center flex justify-center items-center
                    min-w-[40px] h-[40px] text-[4vw] transition-all duration-200 ease-in-out
                    md:text-[5vw] md:min-w-[60px] md:h-[60px]
                    lg:min-w-[45px] lg:h-[45px] lg:text-[1vw]

                    hover:translate-y-[-20px] hover:scale-[1.13]
                    "
                  >
                    {item.number}
                  </m.span>

                  <m.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0,
                    transition: {
                      duration: 0.5,
                      ease: 'easeInOut',
                      delay: index * 0.6
                    }
                  }}
                  viewport={{once: true, amount: 0.2}}
                    className="
                                text flex flex-col
                                "
                  >
                    <m.h3
                      initial={{opacity: 0, y: 20}}
                      whileInView={{opacity: 1, y: 0,
                        transition: {
                          duration: 0.5,
                          ease: 'easeInOut',
                          delay: index * 0.8
                        }
                      }}
                      viewport={{once: true, amount: 0.2}}

                      className="
                                    font-semibold
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
                          duration: 0.5,
                          ease: 'easeInOut',
                          delay: index * 0.9
                        }
                      }}
                      viewport={{once: true, amount: 0.2}}
                      className="
                                    text-[4vw] text-[#4E4E4E]
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
