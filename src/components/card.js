"use client";

import Image from "next/image";
import cardData from "@/data/card_data.json";

export default function Card({ index }) {
  const item = cardData[index];

  if (!item) return <p>Data tidak ditemukan</p>;

  return (
    <div className="


     bg-[#ffffff] shadow-[0px_05px_15px_rgba(0,0,0,0.09)] rounded-2xl gap-2 items-center ransition-all duration-100 ease-in-out w-[270px] m-auto py-8 px-3 justify-center

     md:w-[500px] 

     lg:flex lg:flex-col lg:w-[15vw]
    hover:scale-[100]
    lg:hover:scale-[1.021] lg:hover:shadow-md
    ">
 
        <div 
        className="
        image w-[80%]

        ">
            <Image
            alt={item.title}
            src={item.image}
            width={0}
            height={0}
            className="
            w-[15vw]
            md:w-[20vw]
            lg:w-[6vw]"
            />
        </div>
        <div
        className="
        text w-[80%]
        ">
            <h3
            className="
            font-semibold text-[3.5vw] bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
            md:text-[4vw]
            lg:text-[1.3vw]
            ">
                {item.title}
            </h3>
            <p
            className="
            text-[3vw] text-[#4E4E4E] 
            md:text-[2.8vw]
            lg:text-[0.9vw]
            ">
                {item.paragraph}
            </p>
        </div>
    </div>
  );
}
