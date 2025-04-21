"use client";

import { useState, useEffect } from "react";
import blogs from "@/data/blog.json";
import Image from "next/image";
import Link from "next/link";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Button from "./button";

export default function HeroBlog() {
  const sortedBlogs = blogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Ambil hanya 3 artikel terbaru

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sortedBlogs.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Ganti artikel setiap 3 detik

    return () => clearInterval(interval);
  }, [sortedBlogs.length]);

  return (
    <>
    <LazyMotion features={domAnimation}>
        <section id="blog"
          className="
              h-fit py-18 flex flex-col items-center justify-center gap-[50px]
              lg:grid-cols-2 lg:grid
              "
        >
          {/* BAGIAN TEKS */}
          <div
            className="
                  heading flex flex-col gap-6
                  "
          >
            <m.h2
              initial={{y: 50, opacity: 0}}
              whileInView={{y: 0, opacity: 100}}
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 12,
              }}
              viewport={{once: true, amount: 0.3}}
              className="
                      font-bold
                      text-[8vw] leading-[12vw] text-[#ffffff]

                      md:text-[7vw] md:leading-[10vw]

                      lg:text-[3.3vw] lg:leading-[4.5vw]
                      "
            >
              Bisnis <br />
              <span
                className="
                          bg-[#ffffff] px-3 py-1 rounded-lg text-[#262626]
                          "
              >
                Berkembang
              </span>{" "}
              <br />
              Perlu Pengetahuan
            </m.h2>
            <m.p
            initial={{y: 50, opacity: 0}}
            whileInView={{y: 0, opacity: 100}}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 12,
            }}
            viewport={{once: true, amount: 0.3}}
              className="
                      text-[4vw] [4vw] text-[#cccccc]
                      md:text-[3.3vw]
                      lg:text-[1.3vw]
                      "
            >
              Pelajari artikel kami untuk pemahaman lebih dalam terkait strategi,
              branding, marketing dan sistem big data untuk bisnis.
            </m.p>
            <Button name='Jelajahi Artikel' href='/blog' target='_blank'/>
          </div>

          {/* BAGIAN ARTIKEL */}
          <m.div
          initial={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 100}}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 12,  
          }}
          viewport={{once: true, amount: 0.3}}
          className="latest flex flex-col gap-4">
              <span
              className="
              select-none text-[#ffffff] font-medium 
              md:text-[3.3vw]
              lg:hidden
              ">
                  Artikel Terbaru
              </span>
            <div className="relative w-full h-[500px] grid grid-cols-1 gap-4">
              {sortedBlogs.map((blog, index) => (
                <div
                  key={blog.slug}
                  className={`
                    transition-opacity duration-700
                    ${index === currentIndex ? "opacity-100" : "opacity-0"}
                    ${index === currentIndex ? "z-10" : "z-0"}
                  `}
                >
                  <div
                    className="
                      card flex flex-col bg-[#262626] m-auto px-[3vw] py-[3vw] rounded-2xl w-full gap-[20px]
                      shadow-[0px_0px_12px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out

                      lg:w-[410px] lg:px-[0.5vw] lg:py-[0.4vw] lg:rounded-[1.3vw] lg:gap-[5px]

                      hover:bg-[#ffffff] group hover:translate-y-[-20px]

                      active:bg-[#ffffff] group active:translate-y-[-20px]
                    "
                  >
                    {/* GAMBAR */}
                    <div className="image p-[0.6vw]">
                      <Image
                        src={blog.thumbnail}
                        width={330}
                        height={330}
                        alt={blog.slug}
                        className="
                          w-full object-cover rounded-[2.3vw] shadow-[0px_05px_4px_rgba(0,0,0,0.3)] select-none pointer-events-none lg:rounded-[1vw]
                        "
                      />
                    </div>

                    {/* TEKS */}
                    <div className="text p-[0.6vw] flex flex-col gap-[14px]">
                      <h2
                        className="
                      font-semibold text-[7vw] text-[#ffffff] leading-[8vw] transition-all duration-100 ease-in-out
                      md:text-[5vw] md:leading-[6vw]
                      lg:text-[1.7vw] lg:leading-[2vw]
                      
                      group-hover:invert
                      group-active:invert
                      "
                      >
                        {blog.title}
                      </h2>
                      <p
                        className="
                      text-[4vw] text-[#cccccc] transition-all duration-200 ease-in-out
                      md:text-[3.5vw]
                      lg:text-[1.05vw]

                      group-hover:invert
                      group-active:invert
                      "
                      >
                        {blog.desc}
                      </p>

                      <Link href={`/blog/${blog.slug}`}>
                        <button
                          className="
                          border border-[#ffffff] text-[#ffffff] rounded-3xl  px-[5vw] py-[1.5vw]  cursor-pointer
                          lg:px-[2vw] lg:py-[0.3vw] transition-all duration-200 ease-in-out

                          hover:border-transparent hover:bg-[#262626] hover:text-white 
                          hover:invert-0 group-hover:invert hover:translate-y-[-5px] group-active:invert 
                          "
                        >
                          Baca Artikel
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </m.div>
        </section>
    </LazyMotion>
    </>
  );
}
