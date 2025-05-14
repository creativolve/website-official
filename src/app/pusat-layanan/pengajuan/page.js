"use client";

import { useState } from "react";
import NavLayanan from "@/components/navLayanan";
import FormDiskusi from "@/components/form-diskusi";
import FormProject from "@/components/form-project";

export default function DiskusiAndProjectPage() {
  const [activeForm, setActiveForm] = useState("diskusi");

  return (
    <>
      <NavLayanan />
      <main className="flex-2 px-8 py-2 lg:px-10 lg:py-7 lg:ml-[20%]">
        {/* Navigasi Form */}
        <div className="flex gap-4 mt-[100px] text-white text-[3vw] md:text-[1.8vw] lg:text-[1.2vw]">
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
        </div>

        {/* Tampilkan Form berdasarkan pilihan */}
        {activeForm === "diskusi" && <FormDiskusi />}
        {activeForm === "project" && <FormProject />}
      </main>
    </>
  );
}
