"use client"


import { useState } from "react"
import FormDiskusi from "@/components/formDiskusi";
import FormProject from "@/components/formProyek";


export default function Pengajuan(){
    const [activeForm, setActiveForm] = useState("diskusi");

    return(

        <>
        {/* Navigasi Form */}
        <div className="flex absolute left-[50%] translate-x-[-50%] gap-4 py-7 text-white text-[clamp(0.6rem,0.8vw,0.9rem)] w-[80%] justify-center items-center">
          <span
            onClick={() => setActiveForm("diskusi")}
            className={`cursor-pointer hover:underline  
            ${
              activeForm === "diskusi"
                ? "font-bold text-white"
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
                          ? "font-bold text-[#ffffff]"
                          : "font-reguler text-[#cccccc]"
                      }
                      `}
          >
            Pengajuan Project
          </span>
          |
          <span
            onClick={() => setActiveForm("project")}
            className={`cursor-pointer hover:underline  
                      ${
                        activeForm === "project"
                          ? "font-bold text-[#ffffff]"
                          : "font-reguler text-[#cccccc]"
                      }
                      `}
          >
            Pengajuan Keluhan
          </span>
        </div>


        <div className="bg-[#21252C] rounded-3xl w-[80%] h-[80vh] fixed left-[50%] translate-y-[-50%] translate-x-[-50%] top-[53%] flex p-[15px]">
        {/* Tampilkan Form berdasarkan pilihan */}
        {activeForm === "diskusi" && <FormDiskusi />}
        {activeForm === "project" && <FormProject />}
            
        </div>
      </>
    )
}


