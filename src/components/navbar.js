"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "./button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faWhatsapp,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const clicked = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);

    // Tangani overflow saat navbar terbuka
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

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

  const navLink = [
    { nav: "Tentang", href: "#tentang" },
    { nav: "Layanan", href: "#layanan" },
    { nav: "Mengapa Kami", href: "#mengapa" },
    { nav: "Blog", href: "#blog" },
    { nav: "Diskusi", href: "#diskusi" },
  ];

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.nav
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`
        p-[30px] w-full mt-[-20px] h-[90px] z-[50] transition-all duration-200 ease-linear
        md:py-[20x] md:h-[123px] 
        lg:px-[96px] lg:py-[25px] lg:mt-0 lg:h-auto
        ${
          scrolled
            ? "bg-[#262626e5] backdrop-blur-[2px] fixed shadow-xl"
            : "bg-transparent shadow-none"
        }
        `}
        >
          {/* Dekstop */}
          <div
            className="
            hidden
            lg:visible lg:flex lg:items-center lg:justify-between
            "
          >
            {/* TITLE */}
            <div className="title">
              <Image
                src="/images/logo.png"
                width={300}
                height={200}
                quality={50}
                priority
                fetchPriority="high"
                alt="Creativolve - Creative And Innovative Agency"
                className="select-none w-[11vw]"
              />
            </div>

            {/* LINK NAVBAR */}
            <ul
              className="
              flex gap-12 text-[1vw] text-[#C6C6C6] overflow-hidden
              "
            >
              {/* ITERASI */}
              {navLink.map((item, index) => (
                <li
                  key={index}
                  className="
                  hover:text-[#ffffff] active:text-[#ffffff]
                  "
                >
                  <Link href={item.href}>{item.nav}</Link>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <Button name="Portofolio" href="/" target='_blank'/>
            <m.ul
              initial={{ y: 50, opacity: 0 }}
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
                                icon flex gap-0
                                lg:gap-4
                                "
            >
              {iconSocial.map((item, index) => (
                <m.li
                  key={index}
                  initial={{ opacity: 0}}
                  animate={{
                    opacity: 1
                  }}
                  className="
                      text-[#ffffff]
                      lg:text-[1.8vw] w-[50px] h-[50px] rounded-4xl text-center flex items-center justify-center transition-all duration-200 ease-in-out

                      hover:bg-[#ffffff] hover:text-[#262626] hover:translate-y-[-8px]
            
                      active:bg-[#262626] active:text-[#262626] active:translate-y-[-8px]
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















          {/* Mobile an */}
          <div
            className="
          lg:hidden
          "
          >
            {/* TITLE */}
            <div className="title">
              {/* MOBILE LOGO */}
              <Image
                src="/images/logo.png"
                width={200}
                height={200}
                quality={80}
                fetchPriority="high"
                alt="Creativolve - Creative And Innovative Agency"
                className="
                mb-[-50px]
                lg:hidden w-[150px] md:w-[250px]"
              />

              <h1
                className="
                sr-only
                "
              >
                Creativolve - Creative And Inovativ Agency
              </h1>
            </div>

            <div className="lg:hidden absolute top-[30px] right-[30px]">
              <button
                onClick={toggleNavbar}
                className="text-gray-700"
                aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
              >
                {/* OPEN MENU */}
                {isOpen === true ? (
                  <X
                    size={40}
                    className="
                  text-white hidden
                  "
                  />
                ) : (
                  <Menu
                    className="
                  w-[30px] h-[30px] text-white
                  md:w-[70px] md:h-[70px]
                  "
                  />
                )}
              </button>
            </div>

            {/* Link */}
            <div
              style={{
                transform: isOpen ? "translateY(-8%)" : "translateY(-150%)",
                transition: "all 1s ease-in-out",
                right: "0px",
              }}
              className="
            flex flex-col gap-10 items-end absolute w-[100vw] h-[115vh]  bg-[#262626] text-[#ffffff] py-58 px-18 overflow-hidden
            md:py-42 md:px-28
            "
            >
              <div className="close fixed top-[120px] right-[30px]">
                <button
                  onClick={toggleNavbar}
                  className="text-gray-700"
                  aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
                >
                  {/* CLOSE MENU */}
                  {isOpen === true ? (
                    <X
                      size={55}
                      className="
                    w-[45px] h-[45px] text-white
                    md:w-[70px] md:h-[70px]
                    "
                    />
                  ) : (
                    <Menu size={40} className="hidden" />
                  )}
                </button>
              </div>

              <ul
                className="
              flex flex-col gap-7 items-end
              "
              >
                {/* Iterasi */}
                {navLink.map((item, index) => (
                  <li
                    key={index}
                    className="
                  text-[4.9vw] text-[#dfdfdf]
                  md:text-[4vw]
                  transition-all duration-100 ease-in-out

                  hover:text-[#ffffff] active:text-[#ffffff]
                  "
                    onClick={clicked}
                  >
                    <Link href={item.href}>{item.nav}</Link>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button name="Portofolio" href="/" target='_blank'/>
              <m.ul
              initial={{ y: 50, opacity: 0 }}
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
          </div>
        </m.nav>
      </LazyMotion>
    </>
  );
}
