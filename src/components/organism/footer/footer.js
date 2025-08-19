import Image from "next/image";
import Link from "next/link";
import {
  faInstagram,
  faTiktok,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  {
    name: faLinkedinIn,
    url: "https://www.linkedin.com/company/creativolve",
    label: "LinkedIn",
  },
];

const produk = [
  {
    link: "Konsultasi",
    href: "/",
  },
  {
    link: "Layanan",
    href: "/",
  },
];

const contact = [
  {
    link: "Email",
    href: "creativolve.agency@gmail.com",
  },
  {
    link: "WhatsApp",
    href: "https://wa.me/6288289158984",
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="
       h-fit py-20

        "
    >
        <div
        className="
        bg-[#21252C] py-[90px] px-[50px] rounded-[30px]
        md:px-[15vw]
        lg:px-[100px] lg:py-[120px] 
        grid grid-cols-1 gap-[50px]
        lg:grid-cols-4 lg:gap-[10px]
        ">
            <div
                className="
                    desk flex flex-col gap-[13px]
                    "
            >
                <Image
                src="/logo/logo.png"
                alt="Creativolve Agency"
                width={600}
                height={600}
                quality={100}
                className="
                        w-[35vw] pointer-events-none select-none
                        lg:w-[11vw]
                        "
                />
                <p
                data-nosnippet
                className="
                        text-[#C5C5C5] text-[3.5vw]
                        md:text-[2.8vw]
                        lg:text-[0.9vw]
                        "
                >
                Solusi efektif untuk beralih ke Bisnis Digital dengan strategi
                branding dan marketing yang tepat, tanpa mengkhawatirkan biaya
                anggaran.
                </p>
            </div>

            <div
                className="
                    flex flex-col gap-[5px]
                    lg:px-[100px]"
            >
                <h2
                data-nosnippet
                className="
                        font-semibold text-white text-[4.2vw]
                        md:text-[3.4vw]
                        lg:text-[1.3vw]
                        "
                >
                Produk
                </h2>
                <ul
                className="
                        text-[#C5C5C5] flex flex-col gap-[15px]
                        "
                >
                {produk.map((item, index) => (
                    <li
                    key={index}
                    className="
                                text-[3.5vw] transition-all duration-200 ease-in-out
                                md:text-[2.8vw]
                                lg:text-[0.9vw]
                                hover:text-white
                                "
                    >
                    <Link href={item.href}>
                        <button
                        className="
                                        cursor-pointer px-1 py-1
                                        "
                        >
                        {item.link}
                        </button>
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            <div
                className="
                        flex flex-col gap-[10px]
                        lg:px-[100px]"
            >
                <h2
                data-nosnippet
                className="
                            font-semibold text-white
                            md:text-[3.4vw]
                            lg:text-[1.3vw]
                            "
                >
                Contact
                </h2>
                <ul
                className="
                            text-[#C5C5C5] flex flex-col gap-[15px]
                            "
                >
                {contact.map((item, index) => (
                    <li
                    key={index}
                    className="
                                    text-[3.5vw] transition-all duration-200 ease-in-out
                                    md:text-[2.8vw]
                                    lg:text-[0.9vw]
                                    hover:text-white
                                    "
                    >
                    {/* Gunakan mailto untuk email */}
                    {item.link === "Email" ? (
                        <a href={`mailto:${item.href}`}>
                        <button
                            className="
                                            cursor-pointer px-1 py-1
                                            "
                        >
                            {item.link}
                        </button>
                        </a>
                    ) : (
                        <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <button
                            className="
                                            cursor-pointer
                                            "
                        >
                            {item.link}
                        </button>
                        </Link>
                    )}
                    </li>
                ))}
                </ul>
            </div>

            <div className="flex flex-col gap-3" >
                <span
                        className="
                        text-[#ffffff] text-[3.5vw]
                        md:text-[2.8vw]
                        lg:text-[0.9vw]
                        ">
                Indonesisa, Jawa Barat, Kab Bogor, 16310
                </span>
                <h2
                data-nosnippet
                className="
                        font-semibold text-white
                        md:text-[3.4vw]
                        lg:text-[1.3vw]
                        "
                >
                Ikuti Perjalanan Kami di Media Sosial!
                </h2>
                <ul
                className="
                        medsos flex gap-4
                        "
                >
                {iconSocial.map((item, index) => (
                    <li
                    key={index}
                    className="
                                text-[6.9vw] text-[#C5C5C5] transition-all duration-200 ease-in-out
                                md:text-[4.5vw]
                                lg:text-[1.8vw]
                                hover:text-white 
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

            <div
                className="
                    px-10 flex flex-col gap-[13px] items-center
                    "
            >
            </div>
        </div>

      
    </footer>
  );
}