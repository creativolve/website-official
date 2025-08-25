"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/molecules/navbar/navbar";
import DarkVeil from "@/components/atoms/background/darkveli/darkveli";
import HeroSection from "@/components/organism/hero/hero";



import CurvedLoop from "@/components/atoms/animation/curvedLoop";
import Loader from "@/components/molecules/loader/loader";

const TentangServe = dynamic(() => import("@/components/organism/tentang/tentang-serve"), {
  loading: () => <div className="h-40" />,
});
const Layanan = dynamic(() => import("@/components/organism/layanan/layanan"));
const Mengapa = dynamic(() => import("@/components/organism/mengapa/mengapa"));
const BlogServe = dynamic(() => import("@/components/organism/blog/blogServe"));
const PusatLaySection = dynamic(() => import("@/components/organism/pusatLayanan/pusatLayanan"));
const Footer = dynamic(() => import("@/components/organism/footer/footer"));

export default function HomeClient({children}) {

  
return (
    <>
      <Navbar />
      <div className="w-full h-70 lg:h-120 absolute">
        <DarkVeil />
      </div>
      <main className="z-[10] px-10 md:px-30 lg:px-30">
        <HeroSection />
        <div className="z-[10] mt-[-240px] lg:mt-[-150px]">
          <CurvedLoop
            marqueeText="Digital ✦ Creative ✦ Solution ✦ With ✦ Technology ✦"
            speed={4}
            curveAmount={-220}
            direction="left"
            interactive={false}
            className="text-[200px] lg:text-[100px]"
          />
        </div>
        <TentangServe />
        <Layanan />
        <Mengapa />
        
        {/* Blog masuk dari homeserve.js */}
        {children}
        
        <PusatLaySection />
        <Footer />
      </main>
    </>
  );
}
