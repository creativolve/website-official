"use client"

import Button from "@/components/button";
import ChatAI from "@/components/chatAI";
import NavPusatLayanan from "@/components/navPusLay";
import { useRef, useEffect } from "react";



export default function AsistenDigitalPage() {
  const topRef = useRef(null);

      useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "auto" });
      }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen px-10 py-5">
        {/* Baris atas */}
        <div className="flex items-center justify-between" ref={topRef}>
      <NavPusatLayanan />
          <span className="text-[clamp(0.7rem,2vw,0.9rem)] hidden md:block translate-x-[50%]">
            Asisten Digital 1.3 
          </span>
          <div className="flex  justify-center items-center flex-col-reverse gap-1">
              <Button
              name="Dokumentasi"
              href="/pusat-layanan/asisten-digital/deskripsi"
              />
                      <span className="text-[clamp(0.7rem,2vw,0.9rem)] md:hidden">
            Asisten Digital 1.3
          </span>
          </div>
        </div>

        {/* Konten utama */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[95%] lg:w-[80%]">
            <ChatAI />
          </div>
        </div>
      </div>
    </>
  );
}
