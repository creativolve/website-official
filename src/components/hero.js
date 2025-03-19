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

export default function Hero() {
  const iconSocial = [
    { name: faInstagram, url: "https://www.instagram.com", label: "Instagram" },
    { name: faTiktok, url: "https://www.tiktok.com", label: "TikTok" },
    { name: faWhatsapp, url: "https://wa.me/your-number", label: "WhatsApp" },
    { name: faLinkedinIn, url: "https://www.linkedin.com", label: "LinkedIn" },
  ];

  return (
    <header>
      <Image
        src="/images/hero/background_hero.png"
        alt="background"
        layout="fill"
        objectFit="cover"
        fetchPriority="high"
        loading="lazy"
        className="
        absolute top-0 right-0 opacity-[0.9] z-[-20]
        md:opacity-[0.28]
        lg:opacity-[0.3]
        "
      />
      <div
        className="
        h-[100vh] flex justify-center
        "
      >
        <div
          className="
            typografi flex flex-col items-center gap-8 justify-center mt-[-140px]
            "
        >
          <div
            className="
                heading text-center flex flex-col items-center gap-[14px]
                "
          >
            <h2
              className="
                    font-bold text-[8vw] leading-[9vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
                    lg:text-[3.3vw] lg:leading-[3.7vw] 
                    "
            >
              Bisnis Berevolusi <br /> Perlu Kreativitas
            </h2>
            <p
              className="
                    w-[100%] text-[4vw] text-[#4E4E4E] normal-case
                    lg:w-[55%] lg:text-[1.2vw]
                    "
            >
              Bangun brand digital anda menggunakan strategi terbaik & fleksibel dengan menerapkan sistem automasi.
            </p>
          </div>

          <ul
            className="
                icon flex gap-8
                "
          >
            {iconSocial.map((item, index) => (
              <li
                key={index}
                className="
                        text-[6.9vw] text-[#262626]
                        lg:text-[2.4vw]
                        "
              >
                <Link
                  href={item.url}
                  target="_blank"
                  label={item.label}
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={item.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="
              flex flex-col justify-between items-center gap-10  mt-[-35vh]
              lg:flex-row lg:mt-[-22vh]
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
    </header>
  );
}
