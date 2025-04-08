"use client";

import { useState } from 'react';
import blog from '@/data/blog.json';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter berdasarkan pencarian
  const filteredBlogs = blog.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (  
    <main className="flex flex-col gap-14 
    px-[20px] pt-[30px]
    md:px-[80px]
    lg:px-[120px]">
      {/* INPUT SEARCH */}
      <div className="search w-[80%] m-auto mt-[1vw] flex justify-center items-center gap-5">
        <Link href="/">
            <Image
            src="/images/Back Button.png"
            alt="kembali"
            width={100}
            height={100}
            className='
            w-[12vw]
            lg:w-[2.5vw] object-cover select-none cursor-pointer
            '
            />
        </Link>
        <input
          type="text"
          placeholder="Cari Artikel"
          name='search'
          id='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full rounded-4xl border border-gray-300 px-[3vw] py-[0.8vw]
            text-[5vw] lg:text-[1.2vw] lg:px-[2vw] lg:py-[0.7vw]
            outline-none focus:ring-2 focus:ring-gray-400
          "
        />
      </div>

      {/* LIST ARTIKEL */}
      <article>
        {filteredBlogs.length > 0 ? (
          <div className="grid gap-[50px] lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.slug} className='hover:scale-[1.021] hover:translate-y-[-5px] transition-transform duration-200 ease-in-out'>
                <Image
                  src={blog.thumbnail}
                  width={300}
                  height={300}
                  alt={blog.slug}
                  className="
                    w-full object-cover rounded-[5vw]
                    shadow-[5px_5px_5px_rgba(0,0,0,0.3)] transform
                    select-none pointer-events-none
                    lg:rounded-[1vw]
                  "
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada artikel yang ditemukan.
          </p>
        )}
      </article>
    </main>
  );
}
