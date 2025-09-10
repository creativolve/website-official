import FadeIn from "@/components/atoms/animation/fadein";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaEnvelope,
} from "react-icons/fa";

export default function SocialLinks() {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: "https://wa.me/62881012092569", // ganti dengan nomor WhatsApp
      iconColor: "hover:text-blue-300",
      bgColor:
        "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20",
      textColor: "hover:text-blue-200",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/creativolve_", // ganti dengan username Instagram
      iconColor: "hover:text-indigo-300",
      bgColor:
        "hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-indigo-500/20",
      textColor: "hover:text-indigo-200",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/creativolve", // ganti dengan LinkedIn profile
      iconColor: "hover:text-sky-300",
      bgColor:
        "hover:bg-gradient-to-r hover:from-sky-500/20 hover:to-blue-500/20",
      textColor: "hover:text-sky-200",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      href: "https://www.tiktok.com/@creativolve_", // ganti dengan username TikTok
      iconColor: "hover:text-teal-300",
      bgColor:
        "hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-teal-500/20",
      textColor: "hover:text-teal-200",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      href: "mailto:creativolve.agency@gmail.com", // ganti dengan email
      iconColor: "hover:text-emerald-300",
      bgColor:
        "hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-emerald-500/20",
      textColor: "hover:text-emerald-200",
    },
  ];

  return (
    <section id="kontak" className="z-[10] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <FadeIn>
            <H2 align="center">Mari Terhubung!</H2>
            <Paragraph>Temukan saya di platform sosial media berikut</Paragraph>
          </FadeIn>
        </div>

          <FadeIn>
        <div className="grid grid-cols-1 gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;

              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                  group flex items-center gap-4 p-4 rounded-xl 
                  bg-white/10 backdrop-blur-md border border-white/20 
                  shadow-lg transition-all duration-300
                  hover:bg-white/20 hover:shadow-xl hover:scale-[1.02] hover:border-white/30
                  ${social.bgColor}
                `}
                >
                  <div
                    className={`
                  flex items-center justify-center w-12 h-12 
                  rounded-lg bg-white/15 text-white/80
                  transition-all duration-300
                  ${social.iconColor}
                `}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`
                    font-semibold text-white transition-colors duration-300
                    ${social.textColor}
                  `}
                    >
                      {social.name}
                    </h3>
                    <p
                      className={`
                    text-sm text-white/60 transition-colors duration-300
                    group-hover:text-white/80
                  `}
                    >
                      Terhubung di {social.name}
                    </p>
                  </div>

                  <div className="text-white/60 group-hover:text-blue-300 transition-colors duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
        </div>
          </FadeIn>
      </div>
    </section>
  );
}
