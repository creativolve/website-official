"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";


// Framer Motion
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = ()=>(setIsOpen(!isOpen));

  const clicked = () => (setIsOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    // Tangani overflow saat navbar terbuka
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const navLink = [
    { nav: "Tentang", href: "#tentang" },
    { nav: "Layanan", href: "#layanan" },
    { nav: "Mengapa Kami", href: "#mengapa" },
    // { nav: "Blog", href: "#blog" },
  ];

  return (
    <>
    <LazyMotion features={domAnimation}>
        <m.nav
          initial={{opacity: 0, y:-2}}
          animate={{opacity:1, y:0}}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
          className={`
        p-[30px] w-full mt-[-20px] h-[90px] z-[10]
        lg:px-[200px] lg:py-[15px] lg:mt-0 lg:h-auto
        ${scrolled? 'bg-[#fffffff6] backdrop-blur-[2px] fixed shadow-[#7c7c7c0e] shadow-lg' : 'bg-transparent shadow-none'}
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
                src="/images/logo.svg"
                width={140}
                height={200}
                quality={80} 
                priority
                alt="Creativolve - Creative And Innovative Agency"
                className="select-none"
              />

              <h1
                className="
                sr-only
                "
              >
                Creativolve - Creative And Inovativ Agency
              </h1>
            </div>

            {/* LINK NAVBAR */}
            <ul
              className="
              flex gap-12 text-[1vw] text-[#000000]
              "
            >
              {/* ITERASI */}
              {navLink.map((item, index) => (
                <li
                  key={index}
                  className="
                  hover:text-[#4e4e4e]
                  "
                >
                  <Link href={item.href}>{item.nav}</Link>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <Link href="#">
              <button
                href="#"
                className="
                  bg-[#070707] text-white px-[15px] py-[3px] text-[1vw] w-auto rounded-4xl 
                  hover:bg-[#363f5a] hover:text-[#ffffff]
                  "
              >
                Konsultasi
              </button>
            </Link>
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
                src="/images/logo.svg"
                width={0}
                height={0}
                quality={80}
                priority 
                alt="Creativolve - Creative And Innovative Agency"
                className="
                mb-1
                md:hidden w-[120px] md:w-[250px]"
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
                  <X size={40} 
                  className="
                  text-white hidden
                  " />
                ) : (
                  <Menu 
                  className="
                  w-[30px] h-[30px]
                  md:w-[70px] md:h-[70px]
                  "/>
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
            flex flex-col gap-10 items-end absolute w-[100vw] h-[115vh]  bg-[#171717] text-[#ffffff] py-44 px-18 overflow-hidden
            md:py-42 md:px-28
            "
            >
              <div className="close fixed top-[70px] right-[30px]">
                <button
                  onClick={toggleNavbar}
                  className="text-gray-700"
                  aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
                >

                  {/* CLOSE MENU */}
                  {isOpen === true ? (
                    <X size={55} 
                    className="
                    w-[45px] h-[45px] text-white
                    md:w-[70px] md:h-[70px]
                    "/>
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
                  text-[4.9vw]
                  md:text-[4vw]
                  "
                  onClick={clicked}
                  >
                    <Link href={item.href}>{item.nav}</Link>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link href="#">
                <button
                  href="#"
                  className="
                    bg-[#ffffff] text-black px-[15px] text-[4.9vw] w-auto rounded-4xl py-[3px]
                    md:text-[4vw]
                    
                    hover:bg-[#cccccc] hover:text-[black]
                    "
                >
                  Konsultasi
                </button>
              </Link>
            </div>
          </div>
        </m.nav>
    </LazyMotion>
    </>
  );
}
