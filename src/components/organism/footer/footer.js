"use client"

import Image from "next/image";
import Link from "next/link";
import {
  faInstagram,
  faTiktok,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconSocial = [
  { name: faInstagram, url: "https://www.instagram.com/creativolve_", label: "Instagram" },
  { name: faTiktok, url: "https://www.tiktok.com/@creativolve_", label: "TikTok" },
  { name: faLinkedinIn, url: "https://www.linkedin.com/company/creativolve", label: "LinkedIn" },
];

const produk = [
  { link: "Konsultasi", href: "/" },
  { link: "Layanan", href: "/" },
];

const contact = [
  { link: "Email", href: "creativolve.agency@gmail.com" },
  { link: "WhatsApp", href: "https://wa.me/6288289158984" },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative h-fit py-20">
      <div
        className="
          relative z-10 
          bg-[#11111] backdrop-blur-xl border border-white/20
          shadow-lg rounded-[30px]
          py-16 px-8
          md:px-[10vw]
          lg:px-[100px] lg:py-[100px] 
          grid grid-cols-1 gap-12
          lg:grid-cols-4 lg:gap-8
        "
      >
        {/* Logo & Desk */}
        <div className="flex flex-col gap-4">
          <Image
            src="/logo/logo.png"
            alt="Creativolve Agency"
            width={600}
            height={600}
            quality={100}
            className="w-[35vw] lg:w-[11vw] pointer-events-none select-none"
          />
          <p
            data-nosnippet
            className="text-[#E5E5E5] text-sm md:text-base lg:text-sm leading-relaxed"
          >
            Solusi efektif untuk beralih ke Bisnis Digital dengan strategi
            branding dan marketing yang tepat, tanpa mengkhawatirkan biaya
            anggaran.
          </p>
        </div>

        {/* Produk */}
        <div className="flex flex-col gap-3 lg:px-8">
          <h2
            data-nosnippet
            className="font-semibold text-white text-lg md:text-xl lg:text-base"
          >
            Produk
          </h2>
          <ul className="text-[#C5C5C5] flex flex-col gap-3">
            {produk.map((item, index) => (
              <li
                key={index}
                className="text-sm lg:text-sm hover:text-white transition-colors duration-200"
              >
                <Link href={item.href}>{item.link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 lg:px-8">
          <h2
            data-nosnippet
            className="font-semibold text-white text-lg md:text-xl lg:text-base"
          >
            Contact
          </h2>
          <ul className="text-[#C5C5C5] flex flex-col gap-3">
            {contact.map((item, index) => (
              <li
                key={index}
                className="text-sm lg:text-sm hover:text-white transition-colors duration-200"
              >
                {item.link === "Email" ? (
                  <a href={`mailto:${item.href}`}>{item.link}</a>
                ) : (
                  <Link href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Address */}
        <div className="flex flex-col gap-4">
          <span className="text-[#E5E5E5] text-sm lg:text-sm">
            Indonesia, Jawa Barat, Kab Bogor, 16310
          </span>
          <h2
            data-nosnippet
            className="font-semibold text-white text-lg md:text-xl lg:text-base"
          >
            Ikuti Perjalanan Kami di Media Sosial!
          </h2>
          <ul className="flex gap-4">
            {iconSocial.map((item, index) => (
              <li
                key={index}
                className="text-xl text-[#C5C5C5] hover:text-white transition-colors duration-200"
              >
                <Link
                  href={item.url}
                  target="_blank"
                  aria-label={item.label}
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={item.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
