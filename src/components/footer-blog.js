'use client';

import { useParams } from "next/navigation";
import blogs from "@/data/blog.json"
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

export default function FooterBlog(){
    const { slug } = useParams(); 

    const currentPost = blogs.find((post) => post.slug === slug);

    return(
        <footer data-nosnippet id="footer"
        className="
        bg-[#ffffff] h-fit justify-center items-center transition-all duration-200 ease-in-out 
        flex flex-col gap-[100px] py-[90px] px-[50px]
        md:px-[15vw]
        lg:px-[200px] lg:py-[150px] lg:gap-[50px]

        hover:shadow-neutral-900 hover:shadow-2xl
        ">
            <div className="
            desk flex flex-col gap-[20px] 
            lg:w-[40%] justify-center items-center
            ">
                <Link href='/'>
                    <Image
                    src="/images/blog/logo footer.png"
                    alt="Creativolve Agency"
                    width={1000}
                    height={1000}
                    quality={100}
                    className="
                    w-[35vw] select-none transition-all duration-200 ease-in-out
                    lg:w-[12vw]

                    hover:scale-[1.02] hover:translate-y-[-10px]
                    "
                    />
                </Link>
                <p data-nosnippet
                className="
                text-[#262626] text-[3.5vw] text-center
                md:text-[2.8vw]
                lg:text-[1vw]
                ">
                    {currentPost?.metaTag?.description || "Deskripsi tidak ditemukan"}
                </p>
                <span
                className="
                text-[#000000] text-[3.5vw] text-center font-extrabold
                md:text-[2.8vw]
                lg:text-[0.9vw]
                ">
                    Created On Date {currentPost? currentPost.date : ''}
                </span>
            </div>

            


            <div
            className="
            flex flex-col items-center gap-4
            ">
                <h2 data-nosnippet
                className="
                font-semibold text-[#000000] text-center w-[80%]
                md:text-[3.4vw]
                lg:text-[1.3vw]
                ">
                    Ikuti Perjalanan Kami di Media Sosial!
                </h2>
                <ul 
                className="
                medsos flex gap-4 justify-center
                ">
                    {iconSocial.map((item, index) =>(
                        <li key={index}
                        className="
                        text-[6.9vw] text-[#262626] w-[55px] h-[55px] rounded-4xl text-center flex items-center justify-center transition-all duration-200 ease-in-out
                        md:text-[4.5vw]
                        lg:text-[1.8vw]
                        hover:bg-[#262626] hover:text-white hover:translate-y-[-8px]
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