"use client";

import { useState, useEffect } from "react";
import blogs from "@/data/blog.json";
import Image from "next/image";
import Link from "next/link";

import { LazyMotion, domAnimation, m } from "framer-motion";

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
              h-[180vh] my-[150px] flex flex-col items-center justify-center gap-[50px]
              md:h-[300vh] 
              lg:grid-cols-2 lg:grid lg:h-[110vh]
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
                duration: 0.5, 
                ease: 'easeInOut'}}
              viewport={{once: true, amount: 0.3}}
              className="
                      font-bold
                      text-[8vw] leading-[12vw]

                      md:text-[7vw] md:leading-[10vw]

                      lg:text-[3.3vw] lg:leading-[4.5vw]
                      "
            >
              Bisnis <br />
              <span
                className="
                          bg-[#212121] px-3 py-1 rounded-lg text-[#ffffff]
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
              duration: 0.5, 
              delay: 0.4, 
              ease: 'easeInOut'}}
            viewport={{once: true, amount: 0.3}}
              className="
                      text-[4vw] [4vw] text-[#4E4E4E]
                      md:text-[3.3vw]
                      lg:text-[1.3vw]
                      "
            >
              Pelajari artikel kami untuk pemahaman lebih dalam terkait strategi,
              branding, marketing dan sistem big data untuk bisnis.
            </m.p>
            <Link href='/blog' className="block w-fit">
              <m.button
              initial={{y: 50, opacity: 0}}
              whileInView={{y: 0, opacity: 100}}
              transition={{
                duration: 0.5, 
                delay: 0.8, 
                ease: 'easeInOut'}}
              viewport={{once: true, amount: 0.3}}
                className="
                            bg-[#212121] text-[#ffffff] rounded-4xl px-[5vw] cursor-pointer py-[1.5vw] transition-all duration-200 border-transparent border-2 ease-in-out
                            md:text-[2.7vw]
                            lg:text-[1.3vw]
                            lg:px-[2vw] lg:py-[0.3vw]

                            hover:bg-transparent hover:text-[#262626] hover:border-[#262626] hover:translate-y-[-5px] 
                          "
              >
                Jelajahi Artikel
              </m.button>
            </Link>
          </div>

          {/* BAGIAN ARTIKEL */}
          <m.div
          initial={{y: 50, opacity: 0}}
          whileInView={{y: 0, opacity: 100}}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'}}
          viewport={{once: true, amount: 0.3}}
          className="latest flex flex-col gap-4">
              <span
              className="
              select-none text-[#6d6d6d] font-medium 
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
                      card flex flex-col bg-[#ffffff] m-auto px-[3vw] py-[3vw] rounded-2xl w-full gap-[20px]
                      shadow-[0px_0px_12px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out

                      lg:w-[410px] lg:px-[0.5vw] lg:py-[0.4vw] lg:rounded-[1.3vw] lg:gap-[5px]

                      hover:bg-[#262626] group hover:translate-y-[-20px]
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
                      font-semibold text-[7vw] leading-[8vw] transition-all duration-100 ease-in-out
                      md:text-[5vw] md:leading-[6vw]
                      lg:text-[1.7vw] lg:leading-[2vw]
                      
                      group-hover:invert"
                      >
                        {blog.title}
                      </h2>
                      <p
                        className="
                      text-[4vw] text-[#212121] transition-all duration-200 ease-in-out
                      md:text-[3.5vw]
                      lg:text-[1.05vw]

                      group-hover:invert
                      "
                      >
                        {blog.desc}
                      </p>

                      <Link href={`/blog/${blog.slug}`}>
                        <button
                          className="
                          border border-[#212121] text-[#212121] rounded-3xl  px-[5vw] py-[1.5vw]  cursor-pointer
                          lg:px-[2vw] lg:py-[0.3vw] transition-all duration-200 ease-in-out

                          hover:border-transparent hover:bg-[#262626] hover:text-white group-hover:invert hover:translate-y-[-5px] 
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
