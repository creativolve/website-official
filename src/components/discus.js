"use client"

import Button from "./button"
import { LazyMotion, domAnimation, m } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faWhatsapp,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";



export default function Discus(){

    const iconSocial = [
        {
          name: faInstagram,
          url: "https://www.instagram.com/creativolve_",
          label: "Instagram",
        },
        {
          name: faTiktok,
          url: "https://www.tiktok.com/@creativolve_",
          label: "TikTok",
        },
        { name: faWhatsapp, url: "https://wa.me/6288289158984", label: "WhatsApp" },
        {
          name: faLinkedinIn,
          url: "https://www.linkedin.com/company/creativolve",
          label: "LinkedIn",
        },
      ];





    return(
        <>
        <LazyMotion features={domAnimation}>


          <section
          id="diskusi"
          className="
          h-[100vh] flex flex-col justify-center gap-10 items-center
          ">
            <Image
            src="/images/diskusi/background.png"
            alt="background"
            width={300}
            height={300}
            quality={40}
            priority
            className="
              absolute  left-0 w-[100vw] h-[100vh] opacity-10 z-[-20]
              lg:w-full lg:opacity-25 lg:h-auto
              "
                        
              />
              <h2
              className="
                font-semibold w-full text-center text-[6.6vw] text-white
                md:text-[5vw]
                lg:text-[2.4vw] lg:w-[70%]
                "
              >
              Diskusikan Masalah Bisnis Anda Dengan Kami Dan Ciptakan Solusinya Bersama Kami, Pergi Ke Pusat Layanan Kami Sekarang!
              </h2>
              
              <Button name='Pusat Layanan!' href='/pusat-layanan'/>

              <m.ul
                initial={{ y: 0, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 60,
                    damping: 12,
                    delay: 0.8,
                    ease: "easeInOut",
                    staggerChildren: 0.2,
                  },
                }}
                viewport={{ once: true }}
                className="
                                  icon flex gap-5
                                  md:gap-10
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
                        type: "spring",
                        stiffness: 60,
                        damping: 14,
                        duration: 0.5,
                        delay: index * 0.4,
                      },
                    }}
                    viewport={{ once: true }}
                    className="
                        text-[#ffffff] text-[7vw]
                        lg:text-[1.8vw] w-[50px] h-[50px] rounded-4xl text-center flex items-center justify-center transition-all duration-200 ease-in-out
              
                        hover:bg-[#ffffff] hover:text-[#262626] hover:translate-y-[-8px]
              
                        active:bg-[#ffffff] active:text-[#262626] active:translate-y-[-8px]
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
          </section>
        </LazyMotion>
        </>
    )
}