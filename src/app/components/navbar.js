"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Aktifkan kembali scroll
    }
  };

  const navLink = [
    { nav: "Tentang", href: "#tentang" },
    { nav: "Layanan", href: "#layanan" },
    { nav: "Mengapa Kami", href: "#mengapa" },
    { nav: "Blog", href: "#blog" },
  ];

  return (
    <>
      <nav
        className="
      p-[30px] fixed w-full
      lg:px-[200px] lg:py-[10px]
      "
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
            flex gap-12 text-[1vw] text-[#4E4E4E]
            "
          >
            {/* ITERASI */}
            {navLink.map((item, index) => (
              <li
                key={index}
                className="
                hover:text-black
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
              width={150}
              height={150}
              quality={80}
              priority 
              alt="Creativolve - Creative And Innovative Agency"
              className="md:hidden"
            />

              {/* TAB LOGO */}
              <Image
              src="/images/logo.svg"
              width={250}
              height={250}
              quality={80}
              priority
              alt="Creativolve - Creative And Innovative Agency"
              className="
              hidden
              lg:flex
              "
            />


            <h1
              className="
              sr-only
              "
            >
              Creativolve - Creative And Inovativ Agency
            </h1>
          </div>

          <div className="lg:hidden absolute top-[28px] right-[20px]">
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
                w-[45px] h-[45px]
                md:w-[70px] md:h-[70px]
                "/>
              )}

            </button>
          </div>

          {/* Link */}
          <div
            style={{
              transform: isOpen ? "translateY(-10vh)" : "translateY(-200vh)",
              transition: "transform 1s ease-in-out",
              right: "0px",
            }}
            className="
          flex flex-col gap-10 items-end absolute w-[100vw] h-[100vh]  bg-[#171717] text-[#ffffff] py-34 px-18 overflow-hidden
          md:py-42 md:px-28
          "
          >
            <div className="close fixed top-[40px] right-[30px]">
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
            flex flex-col gap-6 items-end
            "
            >
              {/* Iterasi */}
              {navLink.map((item, index) => (
                <li
                  key={index}
                  className="
                text-[4.1vw]
                md:text-[4vw]
                "
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
                  bg-[#ffffff] text-black px-[15px] text-[4.1vw] w-auto rounded-4xl
                  md:text-[4vw]
                  
                  hover:bg-[#cccccc] hover:text-[black]
                  "
              >
                Konsultasi
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
