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

export default function Hero() {
  const iconSocial = [
    { name: faInstagram, url: "https://www.instagram.com", label: "Instagram" },
    { name: faTiktok, url: "https://www.tiktok.com", label: "TikTok" },
    { name: faWhatsapp, url: "https://wa.me/your-number", label: "WhatsApp" },
    { name: faLinkedinIn, url: "https://www.linkedin.com", label: "LinkedIn" },
  ];

  return (
    <>
      <Image
        src="/images/hero/background.svg"
        alt="background"
        layout="fill"
        objectFit="cover"
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
                    font-semibold text-[8vw] leading-[9vw] 
                    lg:text-[3.3vw] lg:leading-[3.7vw] 
                    "
            >
              Bisnis Berevolusi <br /> Perlu Kreativitas
            </h2>
            <p
              className="
                    w-[80%] text-[3.3vw]
                    lg:w-[55%] lg:text-[1.2vw]
                    "
            >
              Bangun Brand Digital Anda dengan Strategi Terbaik & Fleksibel
              dengan menerapkan sistem automasi.
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
                        text-[6.9vw]
                        lg:text-[2.4vw]
                        "
              >
                <Link href={item.url} target="_blank" label={item.label} rel="noopener noreferrer">
                  <FontAwesomeIcon icon={item.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
