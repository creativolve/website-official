  "use client"

  import NavLayanan from "@/components/navLayanan"
  import { useState, useEffect } from "react";
  import Beranda from "@/components/beranda";
  import Kontak from "@/components/kontak";
  import FormDiskusi from "@/components/ajukanDiskusi";
  import ChatAI from "@/components/chatAI";



  export default function Page(){

    const [activeSection, setActiveSection] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "") || "beranda";
        setActiveSection(hash);
      };
  
      handleHashChange();
      setIsReady(true);
  
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

    if (!isReady || !activeSection) return null; 

    return (
      <div className="flex">
        <NavLayanan onSelect={setActiveSection} />
        <main 
        className="
        flex-2 px-4 py-2
        lg:px-20 lg:py-7  lg:ml-[20%] ">
          {renderSection()}
        </main>
      </div>
    );

  }