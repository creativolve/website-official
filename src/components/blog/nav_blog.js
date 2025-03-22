"use client";

import Image from "next/image";



export default function NavBlog(){
    return(
        <>
        <nav
        className="
        px-[30px] py-[10px] 
        md:px-[100px]
        lg:px-[150px] lg:py-[16px] lg:absolute top-0 left-0
        ">
            <Image
            src='/images/blog/Creav Blog.png'
            width={100}
            height={100}
            alt="Creav Blog"
            className="
            w-[16vw]
            lg:w-[7vw]
            "
            />
        </nav>
        </>
    )
}