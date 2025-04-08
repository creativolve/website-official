  "use client";

  import { useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import Image from "next/image";
  import Link from "next/link";



  const kategori = [
    {
      heading: "Layanan Untuk Bisnis",
      paragraph: "Kami memiliki layanan kelas bisnis, layanan ini ditawarkan untuk bisnis UMKM atau Startup yang sedang berkembang,layanan ini memberikan penawaran terbaik untuk para pelaku bisnis.",
      image: "/images/layanan/untuk bisnis.png",
      button: "Lihat Lengkapnya",
      href: "/layanan/kelas-bisnis"
    },
    {
      heading: "Layanan Untuk Umum",
      paragraph: "Kami memiliki Layanan umum, layanan ini di tawarkan content creator, freelancer, hingga organisasi yang sedang membutuhkan suatu jasa digital seperti desain, editing dan lainnya.",
      image: "/images/layanan/untuk umum.png",
      button: "Lihat Lengkapnya",
      href: "/layanan/umum"
    },
  ];

  const buttonToggle =[
    {name: 'Layanan Bisnis'},
    {name: 'Layanan Umum'},
  ]

  export default function Page() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <section
      className="
      flex flex-col px-[20px] py-[40px] gap-10
      md:px-[100px]
      lg:px-[200px] lg:py-[100px] lg:gap-5
      ">
        <nav
        className="
        flex gap-5 items-center
        ">
          <Link 
          href="/"
          className="
          rounded-full p-2 transition-all duration-200 ease-in-out
          hover:bg-[#262626] group 
          ">
              <Image
              src="/images/Back Button.png"
              alt="kembali"
              width={100}
              height={100}
              className='
              w-[8vw] transition-all duration-200 ease-in-out
              lg:w-[2vw] object-cover select-none cursor-pointer
              group-hover:invert
              '
              />
          </Link>
          <div
          className="
          relative bg-[#262626] w-fit h-full px-5 py-2 rounded-3xl flex gap-5 
          ">
            <motion.div 
            className="
            background absolute bg-[#ffffff] w-[46%] h-[60%] rounded-full top-[20%] left-[3%] z-[0]
            "
            animate={{x: selectedIndex === 0 ? 0 : "100%"}}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}

            />
              {buttonToggle.map((items, index) =>(
                <button
                key={index}
                onClick={()=> setSelectedIndex(index)}
                className={`
                font-medium z-[1] cursor-pointer
                text-[3vw]
                lg:text-[0.9vw]
              ${selectedIndex === index ? 'text-[#262626]' : 'text-white'}  
                `}
                >
                  {items.name}
                </button>
              ))}
          </div>
        </nav>

        <article
        className="
        grid place-items-center min-h-[450px]
        lg:grid-cols-2 lg:min-h-[450px] 
        ">

          <AnimatePresence mode="wait">
            {kategori.map((item, index) =>
              index === selectedIndex ? (
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 10,
                  }}
                  layout
                  className="image w-[100%]"
                >
                  <Image
                    src={item.image}
                    alt={item.heading}
                    width={700}
                    height={700}
                    quality={50}
                    priority
                    className="
                    m-auto pointer-events-none select-none w-[70vw]
                    lg:w-[26vw]"
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>


          <AnimatePresence mode="wait">
            {kategori.map((items, index) => 
            index === selectedIndex ? (

              <div key={selectedIndex} className="text w-[90%] flex flex-col gap-7">
                <motion.h2
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 13,
                  mass: 0.8,
                }}
                layout
                className="
                font-semibold text-[6.6vw] leading-[6vw]
                md:text-[5vw]
                 lg:text-[2.4vw] lg:leading-[3vw]
                ">
                  {items.heading}
                </motion.h2>
                <motion.p
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 170,
                  damping: 13,
                  mass: 0.8,
                }}
                layout
                className="
                text-[4vw] text-[#4E4E4E]
                md:text-[3.4vw]
                lg:text-[1.2vw]
                "
                >
                  {items.paragraph}
                </motion.p>
                <Link href={items.href}>
                <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 180,
                  damping: 13,
                  mass: 0.8,
                }}
                layout
                className="
                bg-[#212121] text-[#ffffff] rounded-4xl px-[5vw] cursor-pointer py-[1.5vw] transition-all duration-200 border-transparent border-2 ease-in-out text-[3.5vw]
                md:text-[2.7vw]
                lg:text-[1.1vw]
                lg:px-[2vw] lg:py-[0.3vw]

                hover:bg-transparent hover:text-[#262626]
                hover:border-[#262626] hover:translate-y-[-5px]
                ">
                  {items.button}
                </motion.button>
                </Link>
              </div>
            ) : null )}
          </AnimatePresence>
          </article>
      </section>
    );
  }
