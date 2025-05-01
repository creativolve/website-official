"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from 'next/navigation';  // Ganti ke next/navigation

export default function NavLayanan() {
  const router = useRouter(); // Inisialisasi useRouter dari next/navigation
  const nav = [
    {
      name: "Beranda",
      key: "beranda",
      path: '/pusat-layanan'  // Ganti dari #beranda menjadi /beranda
    },
    {
      name: "Chat AI",
      key: "chatAI",
      path: '/pusat-layanan/chatAI'  // Ganti dari #chat menjadi /chat
    },
    {
      name: "Kontak",
      key: "Kontak",
      path: '/pusat-layanan/kontak'  // Ganti dari #kontak menjadi /kontak
    },
    {
      name: "Ajukan Diskusi",
      key: "AjukaDiskusi",
      path: '/pusat-layanan/diskusi'  // Ganti dari #diskusi menjadi /diskusi
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (path) => {
    setIsOpen(false);
    router.push(path);  // Menggunakan router.push() dari next/navigation
  };

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
            <div className="lg:hidden absolute top-[30px] left-[30px]">
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



              <div className="close fixed top-[30] right-[30px]">
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














      {/* Mobile View */}

      {/* Menu Mobile */}
      <nav
        className={`
          ${isOpen ? 'left-[0]' : 'left-[-350px] md:left-[-400%]'}
          h-[100vh] shadow-xl shadow-black bg-[#171717] w-[60%] p-7 flex gap-20 flex-col fixed z-[500] transition-all duration-600 ease-in-out
          md:w-[50%]
          lg:hidden
        `}
      >
        <div className="title flex flex-col gap-10">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={200}
              height={200}
              alt="logo"
              priority
              className="w-[40vw] md:w-[30vw] lg:w-[13vw]"
            />
          </Link>
          <h1 className="font-bold text-white text-[8vw] leading-[9vw] md:text-[4vw] lg:text-[2vw] lg:leading-[4vw]">
            Pusat Layanan
          </h1>
        </div>
        <ul className="flex text-[#cccccc] flex-col gap-10">
          {nav.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavClick(item.path)}  // Menggunakan router.push()
              className="text-[4vw] md:text-[3vw] lg:text-[1.2vw]"
            >
              <Link href={item.path} className="cursor-pointer hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop View */}
      <nav className="flex-col fixed gap-20 w-[60%] p-7 h-[100vh] bg-[#171717] shadow-xl shadow-black hidden lg:flex lg:w-[20%] lg:left-0">
        <div className="title flex flex-col gap-10">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={200}
              height={200}
              alt="logo"
              priority
              className="w-[40vw] md:w-[30vw] lg:w-[13vw]"
            />
          </Link>
          <h1 className="font-bold text-white text-[8vw] leading-[9vw] md:text-[4vw] lg:text-[2vw] lg:leading-[4vw]">
            Pusat Layanan
          </h1>
        </div>
        <ul className="flex text-[#cccccc] flex-col gap-10">
          {nav.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavClick(item.path)}  // Menggunakan router.push()
              className="text-[4vw] md:text-[3vw] lg:text-[1.2vw]"
            >
              <Link href={item.path} className="cursor-pointer hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
