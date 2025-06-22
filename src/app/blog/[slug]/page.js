export const dynamic = "force-dynamic";

import {
  getCachedDatabase,
  getCachedPostBySlug,
  getCachedPost,
  getCachedBlocks,
} from "@/lib/notion";
import { formatDate } from "@/utils/date";
import "@/css/typografi.css";
import Image from "next/image";
import BackButton from "@/components/backButton";
import Footer from "@/components/footer";

export async function generateStaticParams() {
  const { posts } = await getCachedDatabase();
  return posts.map((post) => ({
    slug: post.properties.Slug?.rich_text?.[0]?.plain_text,
  }));
}

export default async function BlogDetail({ params }) {
  try {
    // Await params for Next.js 15
    const { slug } = await params;

    const post = await getCachedPostBySlug(slug);

    if (!post) return <div>Post tidak ditemukan</div>;

    // Ambil konten lengkap
    const page = await getCachedPost(post.id);
    const blocks = await getCachedBlocks(post.id);

    return (
      <>
        <main>
          <article className="max-w-3xl mx-auto py-20 px-4">
            <BackButton href="/blog" />

            {/* Cover Image */}
            <div className="mb-8 rounded-lg">
              <Image
                src={post.coverUrl}
                width={1000}
                height={1000}
                priority
                quality={100}
                alt={
                  post.properties.Title?.title?.[0]?.plain_text || "Thumbnail"
                }
                className="w-full rounded-2xl object-cover object-left 
                shadow-[0px_0px_20px_#108FFF,0px_0px_20px_#00F6FF]
                h-[30vh] lg:h-auto"
              />
            </div>

            {/* Judul dan Metadata */}
            <h1 className="text-3xl font-bold text-white mb-2">
              {post.properties.Title?.title?.[0]?.plain_text || "Untitled"}
            </h1>

            {post.properties.Published?.date?.start && (
              <time className="text-gray-500 block mb-6">
                {formatDate(post.properties.Published.date.start)}
              </time>
            )}

            {/* Konten */}
            <div
              className="
  py-[6vw] text-justify w-[100%]
  prose prose-2xl 
  prose-p:text-[#cccccc] prose-headings:text-white
  prose-headings:text-[4.6vw] prose-h2:text-[6vw] 
  prose-h1:text-[6.8vw] 
  prose-p:text-[4.5vw]
  prose-li:text-[4.5vw] 
  prose-li:text-[#cccccc]
  prose-li:marker:text-white
  md:prose-headings:text-[3.6vw] md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[3.5vw] md:prose-li:text-[3.5vw]
  lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[2.1vw] lg:prose-h1:text-[3.2vw] lg:prose-p:text-[1.3vw] lg:prose-li:text-[1.3vw]
"
            >
              {blocks && blocks.length > 0 ? (
                <>
                  {blocks.map((block, index) => {
                    if (!block || !block.type) return null;

                    const texts =
                      block[block.type]?.rich_text
                        ?.map((text) => text.plain_text)
                        .join("") || "";

                    // IMAGE
                    if (block.type === "image") {
                      const src =
                        block.image?.external?.url || block.image?.file?.url;
                      const alt =
                        block.image?.caption
                          ?.map((c) => c.plain_text)
                          .join("") || "";
                      return (
                        <div key={block.id} className="my-4">
                          <img
                            src={src}
                            alt={alt}
                            className="w-full rounded-xl shadow-xl"
                          />
                          <p className="text-white mt-[-50px] text-sm">{alt}</p>
                        </div>
                      );
                    }

                    // HEADINGS
                    if (block.type === "heading_1")
                      return <h1 key={block.id}>{texts}</h1>;
                    if (block.type === "heading_2")
                      return <h2 key={block.id}>{texts}</h2>;
                    if (block.type === "heading_3")
                      return <h3 key={block.id}>{texts}</h3>;

                    // PARAGRAPH
                    if (block.type === "paragraph")
                      return <p key={block.id}>{texts}</p>;

                    // BULLETED LIST
                    if (block.type === "bulleted_list_item") {
                      return (
                        <ul key={block.id} className="list-disc pl-5">
                          <li>{texts}</li>
                        </ul>
                      );
                    }

                    // NUMBERED LIST
                    if (block.type === "numbered_list_item") {
                      return (
                        <ol key={block.id} className="list-decimal pl-5">
                          <li>{texts}</li>
                        </ol>
                      );
                    }

                    // TABLE (basic row rendering)
                    if (block.type === "table") {
                      const hasColumnHeader = block.table?.has_column_header;
                      const hasRowHeader = block.table?.has_row_header;
                      return (
                        <table
                          key={block.id}
                          className="table-auto w-full border border-gray-600 text-left"
                        >
                          <tbody>
                            {block.children?.map((row, rowIndex) => (
                              <tr
                                key={row.id}
                                className="border-b border-gray-600"
                              >
                                {row.table_row?.cells?.map(
                                  (cell, cellIndex) => {
                                    const cellText = cell
                                      .map((c) => c.plain_text)
                                      .join("");
                                    const Tag =
                                      hasColumnHeader && rowIndex === 0
                                        ? "th"
                                        : "td";
                                    return (
                                      <Tag key={cellIndex} className="p-2">
                                        {cellText}
                                      </Tag>
                                    );
                                  }
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    }

                    return null;
                  })}
                </>
              ) : (
                <p className="text-gray-500">
                  Tidak ada konten untuk ditampilkan.
                </p>
              )}
            </div>
          </article>
        </main>

        <div className="px-[40px] md:px-[100px] lg:px-[150px] lg:py-[20px]">
          <Footer />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in BlogDetail:", error);
    return (
      <div className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-2xl font-bold text-red-500">Terjadi Kesalahan</h1>
        <p className="text-gray-500 mt-4">
          Tidak dapat memuat post. Silakan coba lagi nanti.
        </p>
        <BackButton href="/blog" />
      </div>
    );
  }
}
