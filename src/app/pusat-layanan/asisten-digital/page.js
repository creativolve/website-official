"use client"


import { BackButton, SolidButton } from "@/components/atoms/button/button";
import ChatAI from "@/components/organism/chat_asisten/chat";
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
          <div className="flex justify-center items-center flex-col-reverse gap-1">
            <BackButton href="/pusat-layanan"/>
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