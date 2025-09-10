"use client"

import { useState } from "react";
import BlurText from "@/components/atoms/animation/blurText";
import FadeIn from "@/components/atoms/animation/fadein";
import { ShinyButton } from "@/components/atoms/button/button";
import H1 from "@/components/atoms/heading/heading";
import Beams from "@/components/atoms/animation/beamsBg";
import GridDistortion from "@/components/atoms/animation/gridDistortion";
import DarkVeil from "@/components/atoms/background/darkveli/darkveli";



export default function HeroBerandaBlog({ searchTerm, setSearchTerm }) {

  return (
    <section
  id="deskripsi"
  className="relative h-screen w-full flex justify-center items-center"
>
  {/* Background */}
  <div className="top-0 left-0 w-full h-full absolute">
      <div className="w-full h-70 lg:h-120 absolute">
        <DarkVeil />
      </div>
    {/* 🔥 Fade/vignette shadow bawah */}
<div className="absolute bottom-0 left-0 w-full h-1/3 
  bg-gradient-to-t 
  from-black/70 via-black/20 to-transparent pointer-events-none" 
/>

  </div>

  {/* Content */}
  <div
    className="lg:w-[50%] inset-0 justify-center px-10 items-center flex flex-col gap-4 relative z-10"
  >
    <div className="w-auto">
      <FadeIn delay={0.5}>
        <ShinyButton>Artikel Milik Agency</ShinyButton>
      </FadeIn>
    </div>

    <H1>
      <BlurText>
        Eksplorasi Wawasan Terbaru seputar Bisnis, Branding, dan Teknologi
        Digital
      </BlurText>
    </H1>

    <input
      type="text"
      placeholder="Cari Artikel"
      name="search"
      id="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full py-3 px-4 rounded-full border-none bg-[#21252C]
                 lg:px-6 lg:py-3
                 outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-white
                 text-white"
    />
  </div>
</section>

  );
}
