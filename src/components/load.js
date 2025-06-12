'use client';

import Image from "next/image";
import '@/css/load.css'
import '@/css/effect.css'


export default function Loader() {
    return (
      <div className="fixed inset-0 flex flex-col gap-6 justify-center items-center bg-[#17181a] z-50">
        <Image 
          src="/images/logo.png"
          alt="Logo"
          width={550}
          height={550}
          priority
          className="w-30" />
          <div className="text">
            <h1 className="text-[clamp(2rem,5vw,2.5rem)] leading-[clamp(2.2rem,5.2vw,2.5rem)] heading-shadow  font-semibold text-loading">
                Selamat Datang
            </h1>
            <div className="flex justify-center items-center">
                <span className="loading loading-infinity text-success loading-xl"></span> Loading, Mohon menunggu!
            </div>
          </div>
        </div>
    )
}