"use client"

import NavLayanan from "@/components/navLayanan"
import { useState, useEffect } from "react";
import Beranda from "@/components/beranda";
import Kontak from "@/components/kontak";
import FormDiskusi from "@/components/ajukanDiskusi";
import ChatAI from "@/components/chatAI";



export default function Page(){

  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "beranda");
    };

    // Jalankan saat load pertama dan saat hash berubah
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "beranda":
        return <Beranda />;
      case "chat":
        return <ChatAI />;
      case "kontak":
        return <Kontak />;
        case "diskusi":
          return <FormDiskusi />;        
      default:
        return <Beranda />;
    }
  };

  return (
    <div className="flex relative">
      <NavLayanan onSelect={setActiveSection} />
      <main 
      className="
      flex-2 px-10 py-20 h-[100vh]
      lg:px-20 lg:py-7  lg:ml-[20%] ">
        {renderSection()}
      </main>
    </div>
  );

}