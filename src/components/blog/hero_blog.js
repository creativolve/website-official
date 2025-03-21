"use client";

import blogs from '@/data/blog.json';
import Image from 'next/image';



export default function HeroBlog(){

    const sortedBlogs = blogs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    return(
        <>
            <header
            className="
            h-[100vh] flex items-center
            ">
                <div 
                className="
                heading
                ">
                    <h1
                    className="
                    font-bold
                    lg:text-[3vw] lg:leading-[3.5vw]
                    ">
                        Bisnis <br />
                        Berkembang <br />
                        Perlu Pengetahuan
                    </h1>
                </div>
                <ul className="latest">
                    {sortedBlogs.map((blog) =>(
                        <li key={blog.slug}>

                            <Image
                            src={blog.imageOg}
                            width={100}
                            height={100}
                            alt={blog.slug}
                            />
                        </li>
                    ))}
                </ul>
            </header>
        </>
    )
}