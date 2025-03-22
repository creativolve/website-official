'use client';

import Image from "next/image";
import '@/css/load.css'


export default function Loader() {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <div className="animate-scale">
          <Image 
          src="/images/load_logo.png"
          alt="Logo"
          width={150}
          height={150}
          priority
          className="w-full" />
        </div>
      </div>
    )
}