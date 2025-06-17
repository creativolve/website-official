"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Heading from "./heading";
import { formatDate } from "@/utils/date";
import NavigationButton from "./backButton";


export default function BerandaBlog({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const title = post.properties.Title?.title?.[0]?.plain_text || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main className="container mx-auto px-4 py-8 relative">
      <NavigationButton iconType="home"/>
      <Image
        src="/images/blog/circleBg.png"
        width={500}
        height={500}
        alt="background"
        className="
          w-[80%] absolute z-[0] top-[0px] pointer-events-none select-none translate-x-[4%]
          lg:w-[63%] lg:left-59
        "
      />

      <div className="hero min-h-[100vh] flex items-center justify-center">
        <div className="content w-full lg:w-[40%] flex flex-col gap-10">
          <Heading index={9} paragraft="center" font="medium" />
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
      </div>

      <div className="flex flex-col gap-8 lg:px-8 max-w-4xl mx-auto">
        {filteredPosts.map((post) => {
          const slug = post.properties.Slug?.rich_text?.[0]?.plain_text || "";
          const title =
            post.properties.Title?.title?.[0]?.plain_text || "Untitled Post";
          const description =
            post.properties.Description?.rich_text?.[0]?.plain_text || "";
          const tags = post.properties.Tags?.multi_select || [];
          const publishedDate = post.properties.Published?.date?.start;
          const coverUrl = post.coverUrl || "/default-cover.jpg";

          return (
            <Link
              href={`/blog/${slug}`}
              key={post.id}
              className="hover:scale-[1.05] transition-transform ease-in-out duration-300"
            >
              <article className="bg-[#21252C] w-full shadow hover:shadow-lg p-3 transition-shadow duration-300 rounded-2xl overflow-hidden flex flex-col-reverse md:flex-row-reverse h-full">
                <div className="relative h-48 md:h-auto md:w-2/3">
                  <Image
                    src={coverUrl}
                    alt={title}
                    fill
                    className="object-cover object-left rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                    unoptimized={false}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow md:w-2/3">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 text-sm rounded-full font-medium"
                          style={{ color: tag.color }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {title}
                  </h2>

                  {publishedDate && (
                    <time className="text-sm text-gray-400 block mb-3">
                      {formatDate(publishedDate)}
                    </time>
                  )}

                  {description && (
                    <p className="text-gray-300 line-clamp-3">{description}</p>
                  )}
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Tidak ditemukan artikel dengan nama tersebut
          </p>
        </div>
      )}
    </main>
  );
}
