"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import GradientButton, { SolidButton } from "@/components/atoms/button/button";
import FadeIn from "@/components/atoms/animation/fadein";
import SpotlightCard from "@/components/atoms/animation/spootlight";


export default function BlogSection({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const latestPosts = posts?.slice(0, 3) || [];

  // Auto-rotate posts with fade animation
  useEffect(() => {
    if (latestPosts.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false); // Start fade out

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % latestPosts.length);
        setIsVisible(true); // Start fade in
      }, 300); // Wait for fade out to complete
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [latestPosts.length]);

  if (!latestPosts.length) {
    return (
      <div className="w-full h-[400px] bg-[#21252C] rounded-[15px] p-[15px] flex items-center justify-center">
        <p className="text-white text-lg">No blog posts available</p>
      </div>
    );
  }

  const currentPost = latestPosts[currentIndex];
  const title =
    currentPost?.properties?.Title?.title?.[0]?.plain_text || "Untitled";
  const slug = currentPost?.properties?.Slug?.rich_text?.[0]?.plain_text || "#";
  const publishedDate = currentPost?.properties?.Published?.date?.start;
  const tags = currentPost?.properties?.Tags?.multi_select || [];
  const description =
    currentPost?.properties?.Description?.rich_text?.[0]?.plain_text || "";

  return (
    <section
      id="blog"
      className="h-[130vh] lg:h-screen flex flex-col justify-center items-start space-y-9"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 lg:w-[40%]">
        <FadeIn>
          <H2>Blog Artikel Terbaru</H2>
        </FadeIn>
        <FadeIn>
          <Paragraph>
            Kami hadir bukan sekadar menyelesaikan proyek Anda tapi untuk
            menjadi solusi jangka panjang bagi kebutuhan digital Anda!
          </Paragraph>
          <div className="w-auto">
            <SolidButton href="/blog">Jelajahi Artikel!</SolidButton>
          </div>
        </FadeIn>
      </div>

      <FadeIn>

          <SpotlightCard className="w-full rounded-[15px] p-4 md:p-6 relative overflow-hidden">

            <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
              {/* Dots indicator */}
              <div className="flex gap-2">
                {latestPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsVisible(false);
                      setTimeout(() => {
                        setCurrentIndex(index);
                        setIsVisible(true);
                      }, 300);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#318aff] w-6"
                        : "bg-gray-600  hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main content */}
            <div
              className={`flex flex-col lg:flex-row gap-4 md:gap-6 transition-all duration-300 ease-in-out relative z-10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Thumbnail */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative w-full aspect-video rounded-[12px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  <Image
                    src={
                      currentPost?.coverUrl ||
                      "/images/blog/default-thumbnail.jpg"
                    }
                    fill
                    alt={title}
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
                        className="px-3 py-1 text-xs font-medium rounded-full bg-[#318aff] text-[#ffffff] border border-[#ffffff]"
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
                    Baca Selegkapnya
                  </GradientButton>
                </div>
              </div>
            </div>
          </SpotlightCard>
      </FadeIn>
    </section>
  );
}
