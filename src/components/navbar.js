"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "./button";
import Iconsosmed from "./iconSocial";

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

  const navLink = [
    { nav: "Tentang", href: "#tentang" },
    { nav: "Layanan", href: "#layanan" },
    { nav: "Mengapa Kami", href: "#mengapa" },
    { nav: "Blog", href: "#blog" },
    { nav: "Pusat Layanan", href: "#pusatLayanan" },
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
        w-full h-[75px] z-[100] absolute left-0 top-0 px-[40px] lg:px-[150px]
        md:py-[20x] md:h-[123px]
        lg:h-auto lg:py-[1.3rem]
        ${
          scrolled
            ? "bg-[#17181a90] backdrop-blur-[10px] fixed shadow-xl "
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
                   hover:translate-y-[-5px] transition-all duration-100
                  "
                >
                  <Link
                    className="
                hover:text-[#00E5FF] hover:text-shadow-lg hover:text-shadow-[#00E5FF]
                active:text-[#00E5FF] 
                "
                    href={item.href}
                  >
                    {item.nav}
                  </Link>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <Button name="Portofolio" href="/" target="_blank" />
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
                lg:hidden w-[150px] md:w-[200px] translate-y-[50%]"
              />

              <h1
                className="
                sr-only
                "
              >
                Creativolve - Creative And Inovativ Agency
              </h1>
            </div>

            <div className="lg:hidden absolute translate-y-[55%] right-[50px] md:right-[150px]">
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
                  w-[40px] h-[40px] text-white
                  md:w-[45px] md:h-[45px]
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
            flex flex-col gap-10 items-end fixed w-[100vw] h-[115vh] z-[9999] bg-[#17181a] text-[#ffffff] py-58 px-18 overflow-hidden
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
                  w-[40px] h-[40px] text-white
                  md:w-[45px] md:h-[45px]
                    "
                    />
                  ) : (
                    <Menu size={40} className="hidden" />
                  )}
                </button>
              </div>

              <ul
                className="
              flex flex-col gap-5 md:gap-10 items-end
              "
              >
                {/* Iterasi */}
                {navLink.map((item, index) => (
                  <li
                    key={index}
                    className="
                  text-[clamp(1rem,2vw,1.9rem)] text-[#dfdfdf]
                  transition-all duration-100 ease-in-out

                hover:text-[#00E5FF] hover:text-shadow-lg hover:text-shadow-[#00E5FF]
                active:text-[#00E5FF] 
                  "
                    onClick={clicked}
                  >
                    <Link href={item.href}>{item.nav}</Link>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button name="Portofolio" href="/" target="_blank" />
              <Iconsosmed />
            </div>
          </div>
        </m.nav>
      </LazyMotion>
    </>
  );
}
