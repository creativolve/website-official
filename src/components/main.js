"use client"

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./navbar"), { ssr: true });
const Hero = dynamic(() => import("./hero"), { ssr: true });
const Card = dynamic(() => import("./card"), { ssr: true });
const Tentang = dynamic(() => import("./tentang"), { ssr: true });
const Layanan = dynamic(() => import("./layanan"), { ssr: true });
const Mengapa = dynamic(() => import("./mengapa"), { ssr: true });
const BlogSec = dynamic(() => import("./blogSec"), { ssr: true });
const PusatLaySec = dynamic(() => import("./pusatLaySec"), { ssr: true });
const Footer = dynamic(() => import("./footer"), { ssr: true });

export default function Main() {

    return(
        <div
        className="
        px-[40px]
        md:px-[100px]
        lg:px-[150px] lg:py-[20px]
        ">

            

        <Navbar/>
        <main>
            <Hero/>
            <div 
            className="
            container-card h-fit py-20 grid place-items-center gap-8 my-[70px]
            md:grid-cols-2 md:grid-rows-2 md:gap-15
            lg:grid-cols-4 lg:grid-rows-1
            ">
                <Card index={0}/>
                <Card index={1}/>
                <Card index={2}/>
                <Card index={3}/>
            </div>
            <Tentang/>
            <Layanan/>
            <Mengapa/>
            <BlogSec/>
            <PusatLaySec/>
        </main>
        <Footer/>   
        <div className="z-[100] fixed bottom-0 left-0 w-full h-[80px] bg-[#17181a48] backdrop-blur-[5px] lg:h-[10px]
    [mask-image:linear-gradient(to_top,black,transparent)] 
    [webkit-mask-image:linear-gradient(to_top,black,transparent)]">
</div>

        </div>
    )
}