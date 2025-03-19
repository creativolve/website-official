'use client';

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
    {
        link: 'Konsultasi',
        href: '/' 
    },
    {
        link: 'Layanan',
        href: '/' 
    }
]

const contact = [
    {
        link: 'Email',
        href: 'creativolve.agency@gmail.com' 
    },
    {
        link: 'WhatsApp',
        href: 'https://wa.me/6288289158984' 
    }
]



export default function Footer(){
    return(
        <footer data-nonsnipet
        className="
        bg-[#212121] h-fit
        grid grid-cols-1 gap-[30px] py-[90px] px-[50px]
        lg:px-[200px] lg:grid-cols-4 lg:py-[120px] lg:gap-[10px]
        ">
            <div className="
            desk flex flex-col gap-[13px]
            ">
                <Image
                src="/images/logo_footer.png"
                alt="Creativolve Agency"
                width={500}
                height={500}
                quality={100}
                className="
                w-[35vw] pointer-events-none select-none
                lg:w-[11vw]
                "
                />
                <p
                className="
                text-[#C5C5C5] text-[3.5vw]
                lg:text-[0.9vw]
                ">
                Creativolve Agency adalah agency full-service yang membantu bisnis berkembang dengan strategi digital branding berbasis automasi.
                </p>
            </div>

            <div
            className="
            flex flex-col gap-[5px]
            lg:px-[100px]"
            >
                <h2
                className="
                font-semibold text-white text-[4.2vw]
                lg:text-[1.3vw]
                "
                >
                    Produk
                </h2>
                <ul
                className="
                text-[#C5C5C5] flex flex-col gap-[0px]
                ">
                    {produk.map((item, index) =>(
                        <li key={index}
                        className="
                        text-[3.5vw]
                        lg:text-[0.9vw]
                        ">
                            <Link href={item.href}>
                                <button>
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
                className="
                font-semibold text-white
                lg:text-[1.3vw]
                "
                >
                    Contact
                </h2>
                <ul
                className="
                text-[#C5C5C5] flex flex-col gap-[6px]
                ">
                    {contact.map((item, index) =>(
                        <li key={index}
                        className="
                        text-[3.5vw]
                        lg:text-[0.9vw]
                        ">
                            <Link href={item.href}>
                                <button>
                                    {item.link}
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2
                className="
                font-semibold text-white
                lg:text-[1.3vw]
                ">
                    Ikuti Perjalanan Kami di Media Sosial!
                </h2>
                <ul 
                className="
                medsos flex gap-4
                ">
                    {iconSocial.map((item, index) =>(
                        <li key={index}
                        className="
                        text-[6.9vw] text-[#C5C5C5]
                        lg:text-[1.8vw]
                        "
                        >
                            <Link
                            href={item.url}
                            target="_blank"
                            label={item.label}
                            rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={item.name}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </footer>
    )
}