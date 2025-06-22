"use client"

import Button from "@/components/button";
import ChatAI from "@/components/chatAI";
import NavPusatLayanan from "@/components/navPusLay";
import { useRef, useEffect } from "react";

export default function AsistenDigitalPage() {
  const topRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "auto" });
    
    // Force overflow untuk container chat
    if (chatContainerRef.current) {
      chatContainerRef.current.style.overflowY = 'auto';
      chatContainerRef.current.style.overscrollBehavior = 'contain';
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen px-10 py-5">
        {/* Baris atas */}
        <div className="flex items-center justify-between" ref={topRef}>
          <NavPusatLayanan />
          <span className="text-[clamp(0.7rem,2vw,0.9rem)] hidden md:block translate-x-[50%] text-white">
            ORVIA {"(C.O.R.A)"} 1.4
          </span>
          <div className="flex justify-center items-center flex-col-reverse gap-1">
            <Button
              name="Dokumentasi"
              href="/pusat-layanan/asisten-digital/deskripsi"
            />
            <span className="text-[clamp(0.7rem,2vw,0.9rem)] md:hidden text-white">
              ORVIA {"(C.O.R.A)"} 1.4
            </span>
          </div>
        </div>

        {/* Konten utama */}
        <div className="flex-1 flex items-center justify-center">
          <div 
            ref={chatContainerRef}
            data-lenis-prevent 
            className="w-[95%] lg:w-[80%] h-[70vh] overflow-y-auto"
          >
            <ChatAI />
          </div>
        </div>
      </div>
    </>
  );
}