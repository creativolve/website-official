"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import GradientButton, { BackButton } from "@/components/atoms/button/button";
import SpotlightCard from "@/components/atoms/animation/spootlight";
import HeroBerandaBlog from "./hero";
import FadeIn from "@/components/atoms/animation/fadein";



export default function BerandaBlog({ posts }) {

      const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const title = post.properties.Title?.title?.[0]?.plain_text || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
<HeroBerandaBlog searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <main className="container mx-auto px-4 py-8 relative">
      <BackButton />

<FadeIn>
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
            <SpotlightCard
              key={post.id}
              className="w-full rounded-[15px] p-4 md:p-6 relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 transition-all duration-300 ease-in-out relative z-10">
                {/* Thumbnail */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="relative w-full aspect-video rounded-[12px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                    <Image
                      src={coverUrl}
                      alt={title}
                      fill
                      quality={60}
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between py-2">
                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-[#318aff] text-white border border-white"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-[clamp(1rem,2.5vw,1.4rem)] font-bold text-white mb-2 line-clamp-2 leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  {description && (
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3 leading-relaxed">
                      {description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-end justify-between mt-auto">
                    <div className="text-gray-400 text-xs md:text-sm">
                      {publishedDate && (
                        <time dateTime={publishedDate}>
                          {formatDate(publishedDate)}
                        </time>
                      )}
                    </div>

                    <GradientButton
                      href={`/blog/${slug}`}
                      className="font-semibold leading-none flex items-center gap-2 py-3 group"
                    >
                      Baca Selengkapnya
                    </GradientButton>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
</FadeIn>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Tidak ditemukan artikel dengan nama tersebut
          </p>
        </div>
      )}
    </main>
    </>
  );
}
