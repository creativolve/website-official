export const dynamic = 'force-dynamic';

import { getCachedDatabase, getCachedPostBySlug, getCachedPost, getCachedBlocks } from '@/lib/notion';
import { formatDate } from '@/utils/date';
import '@/css/typografi.css'
import Image from 'next/image';
import BackButton from "@/components/backButton";
import Footer from '@/components/footer';

export async function generateStaticParams() {
  const { posts } = await getCachedDatabase();
  return posts.map(post => ({
    slug: post.properties.Slug?.rich_text?.[0]?.plain_text
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
            <BackButton href='/blog'/>
            
            {/* Cover Image */}
            <div className="mb-8 rounded-lg">
              <Image
                src={post.coverUrl}
                width={1000}
                height={1000}
                priority
                quality={100}
                alt={post.properties.Title?.title?.[0]?.plain_text || "Thumbnail"}
                className="w-full rounded-2xl object-cover object-left 
                shadow-[0px_0px_20px_#108FFF,0px_0px_20px_#00F6FF]
                h-[30vh] lg:h-auto"
              />
            </div>

            {/* Judul dan Metadata */}
            <h1 className="text-3xl font-bold mb-2">
              {post.properties.Title?.title?.[0]?.plain_text || 'Untitled'}
            </h1>
            
            {post.properties.Published?.date?.start && (
              <time className="text-gray-500 block mb-6">
                {formatDate(post.properties.Published.date.start)}
              </time>
            )}

            {/* Konten */}
            <div className="
              py-[6vw] text-justify w-[100%]
              prose prose-2xl prose-headings:text-[4.6vw] prose-h2:text-[6vw] prose-h1:text-[6.8vw] prose-p:text-[4.5vw] prose-li:text-[4.5vw] 
              md:prose-headings:text-[3.6vw] md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[3.5vw] md:prose-li:text-[3.5vw] prose-p:text-[#cccccc] prose-headings:text-white
              lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[2.1vw] lg:prose-h1:text-[3.2vw] lg:prose-p:text-[1.3vw] lg:prose-li:text-[1.3vw]
            ">
              {blocks && blocks.length > 0 ? (
                blocks.map(block => {
                  if (!block || !block.type) return null;
                  
                  return (
                    <div key={block.id} className="mb-4">
                      {/* Renderer untuk tiap tipe block Notion */}
                      {block.type === 'paragraph' && block.paragraph?.rich_text?.length > 0 && (
                        <p>{block.paragraph.rich_text.map(text => text.plain_text).join('')}</p>
                      )}
                      {block.type === 'heading_1' && block.heading_1?.rich_text?.length > 0 && (
                        <h1>{block.heading_1.rich_text.map(text => text.plain_text).join('')}</h1>
                      )}
                      {block.type === 'heading_2' && block.heading_2?.rich_text?.length > 0 && (
                        <h2>{block.heading_2.rich_text.map(text => text.plain_text).join('')}</h2>
                      )}
                      {block.type === 'heading_3' && block.heading_3?.rich_text?.length > 0 && (
                        <h3>{block.heading_3.rich_text.map(text => text.plain_text).join('')}</h3>
                      )}
                      {block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text?.length > 0 && (
                        <ul>
                          <li>{block.bulleted_list_item.rich_text.map(text => text.plain_text).join('')}</li>
                        </ul>
                      )}
                      {block.type === 'numbered_list_item' && block.numbered_list_item?.rich_text?.length > 0 && (
                        <ol>
                          <li>{block.numbered_list_item.rich_text.map(text => text.plain_text).join('')}</li>
                        </ol>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">Tidak ada konten untuk ditampilkan.</p>
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
        <BackButton href='/blog'/>
      </div>
    );
  }
}