"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faWhatsapp,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";
import Card from "./card";


// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";


export default function Hero() {
  const iconSocial = [
    { name: faInstagram, url: "https://www.instagram.com/creativolve_", label: "Instagram" },
    { name: faTiktok, url: "https://www.tiktok.com/@creativolve_", label: "TikTok" },
    { name: faWhatsapp, url: "https://wa.me/6288289158984", label: "WhatsApp" },
    { name: faLinkedinIn, url: "https://www.linkedin.com/company/creativolve", label: "LinkedIn" },
  ];

  return (
    <header
    className="
    py-36
    lg:h-[100vh]
    "
    >
      <LazyMotion features={domAnimation}>
          <Image
            src="/images/hero/background_hero.png"
            alt="background"
            width={300}
            height={300}
            quality={40}
            priority
            className="
            absolute top-0 left-0 object-cover w-full h-[100vh] opacity-[0.9] z-[-20]
            lg:opacity-[0.4] lg:w-full lg:h-auto
            "
            
          />
            <div
              className="
                typografi flex flex-col items-center gap-8 justify-center z-[-2]
                "
            >
              <div
                className="
                    heading text-center flex flex-col items-center gap-[14px]
                    "
              >
                <m.h2
                initial={{y: 50, opacity: 0}}
                whileInView={{y: 0, opacity: 100}}
                transition={{
                  type: 'spring',
                  stiffness: 60,
                  damping: 12,
                  duration: 0.5, 
                  ease: 'easeInOut'}}
                viewport={{once: true}}
                  className="
                        font-bold text-[8vw] leading-[9vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                        md:text-[7vw] md:leading-[7.1vw]
                        lg:text-[3.3vw] lg:leading-[3.7vw] 
                        "
                >
                  Bisnis Berkembang <br /> Perlu Kreativitas
                </m.h2>
                <m.p
                  initial={{y: 50, opacity: 0}}
                  whileInView={{y: 0, opacity: 100}}
                  transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 12,
                    duration: 0.5, 
                    delay: 0.4, 
                    ease: 'easeInOut'}}
                  viewport={{once: true}}
                  className="
                        w-[100%] text-[4vw] text-[#4E4E4E] normal-case
                        md:text-[3.3vw]
                        lg:w-[55%] lg:text-[1.2vw]
                        "
                >
                    Solusi efektif untuk beralih ke Bisnis Digital dengan strategi branding dan marketing yang tepat.
                </m.p>
              </div>

              <m.ul
              initial={{y: 50, opacity: 0}}
              whileInView={{y: 0, opacity: 1,
                transition: {
                  type: 'spring',
                  stiffness: 60,
                  damping: 12,
                  delay: 0.8, 
                  ease: 'easeInOut',
                  staggerChildren: 0.2
                }
              }}
              viewport={{once: true}}

                className="
                    icon flex gap-0
                    lg:gap-4
                    "
              >
                {iconSocial.map((item, index) => (
                  <m.li
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 60,
                        damping: 14,
                        duration: 0.5,
                        delay: index * 0.4
                      },
                    }}
                    viewport={{once: true}}
                    className="
                            text-[6.9vw] text-[#262626]
                            lg:text-[2.4vw] w-[65px] h-[65px] rounded-4xl text-center flex items-center justify-center transition-all duration-200 ease-in-out

                             hover:bg-[#262626] hover:text-white hover:translate-y-[-8px]

                            active:bg-[#262626] active:text-white active:translate-y-[-8px]
                            "
                  >
                    <Link
                      href={item.url}
                      target="_blank"
                        aria-label={`buka ${item.label} Creativolve Agency`}
                        rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={item.name} />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </div>

          <div
            className="
                  flex flex-col justify-between items-center gap-10 
                  lg:flex-row mt-[17vh]
                  "
          >
            <div
              className="
                    digital-marketing w-full
                    lg:mt-[-130px] lg:ml-0
                    "
            >
              <Card index={0} />
            </div>

            <div
              className="
                    digital-branding w-full
                    lg:m-0
                    "
            >
              <Card index={1} />
            </div>

            <div
              className="
                    digital-ads w-full
                    lg:mt-[-190px] lg:ml-0
                    "
            >
              <Card index={2} />
            </div>

            <div
              className="
                    digital-solution w-full
                    lg:m-0
                    "
            >
              <Card index={3} />
            </div>
          </div>
      </LazyMotion>
    </header>
  );
}
