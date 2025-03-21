"use client";

import Image from "next/image";



export default function NavBlog(){
    return(
        <>
        <nav>
            <Image
            src='/images/blog/Creav Blog.png'
            width={100}
            height={100}
            alt="Creav Blog"
            />
        </nav>
        </>
    )
}