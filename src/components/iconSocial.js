"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faWhatsapp,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import "@/css/effect.css";
import { useState } from "react";


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






export default function IconSocialMedia() {

    const [isHovered, setIsHovered] = useState(null);

  return (
    <>
      <ul
        className="
            icon flex gap-0 z-[1]
            md:gap-3
            lg:gap-4
            "
      >
        {iconSocial.map((item, index) => (
          <li
            key={index}
            className={`
                text-[#00E5FF]
                text-[clamp(1.5rem,3vw,1.8rem)]
                w-[50px] h-[50px] rounded-4xl text-center flex items-center justify-center transition-all duration-200 ease-in-out
            
                hover:text-[#262626] hover:translate-y-[-8px]    hover:shadow-[#00E5FF] hover:shadow-lg
                ${isHovered === index ? "background-gradient" : ""}
                        
                active:bg-[#262626] active:text-[#262626] active:translate-y-[-8px]
            `}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
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
          </li>
        ))}
      </ul>
    </>
  );
}
