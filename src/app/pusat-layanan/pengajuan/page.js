"use client"


import { useState } from "react"
import FormDiskusi from "@/components/formDiskusi";
import FormProject from "@/components/formProyek";
import NavPusatLayanan from "@/components/navPusLay";


export default function Pengajuan(){
    const [activeForm, setActiveForm] = useState("diskusi");

    return(

        <>
          <NavPusatLayanan page="pengajuan"/>
        {/* Navigasi Form */}
        <div className="flex fixed top-0 lg:top-0 left-[58%] translate-x-[-50%] gap-4 py-7 text-white text-[clamp(0.6rem,0.8vw,0.9rem)] w-[80%] justify-center items-center
        md:left-[50%]">
          <span
            onClick={() => setActiveForm("diskusi")}
            className={`cursor-pointer hover:underline  
            ${
              activeForm === "diskusi"
                ? "font-bold text-[#00ccff]"
                : "font-reguler text-[#cccccc]"
            }
            `}
          >
            Pengajuan Diskusi
          </span>
          |
          <span
            onClick={() => setActiveForm("project")}
            className={`cursor-pointer hover:underline  
                      ${
                        activeForm === "project"
                          ? "font-bold text-[#00ccff]"
                          : "font-reguler text-[#cccccc]"
                      }
                      `}
          >
            Pengajuan Project
          </span>
        </div>


        <div className="bg-[#21252C] rounded-3xl w-[80%] h-[80vh] fixed left-[50%] translate-y-[-50%] translate-x-[-50%] top-[53%] flex p-[15px] overflow-scroll text-white">
        {/* Tampilkan Form berdasarkan pilihan */}
        {activeForm === "diskusi" && <FormDiskusi />}
        {activeForm === "project" && <FormProject />}
            
        </div>
      </>
    )
}


