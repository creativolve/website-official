import { getDatabase, getPage, getBlocks } from '@/lib/notion';
import { formatDate } from '@/utils/date';
import '@/css/typografi.css'
import Image from 'next/image';
import BackButton from "@/components/backButton";
import Footer from '@/components/footer';

export async function generateStaticParams() {
  const posts = await getDatabase();
  return posts.map(post => ({
    slug: post.properties.Slug?.rich_text?.[0]?.plain_text
  }));
}

export default async function BlogDetail({ params }) {
  // PENTING: Await params terlebih dahulu untuk Next.js 15
  const { slug } = await params;
  
  // Cari post berdasarkan slug
  const posts = await getDatabase();
  const post = posts.find(p => 
    p.properties.Slug?.rich_text?.[0]?.plain_text === slug
  );

  if (!post) return <div>Post tidak ditemukan</div>;

  // Ambil konten lengkap
  const page = await getPage(post.id);
  const blocks = await getBlocks(post.id);

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
                alt="Thumbnail"
                className="w-full rounded-2xl object-cover object-left 
                shadow-[0px_0px_20px_#108FFF,0px_0px_20px_#00F6FF]
                h-[30vh] lg:h-auto"
                />
            </div>

            {/* Judul dan Metadata */}
            <h1 className="text-3xl font-bold mb-2">
                {post.properties.Title?.title?.[0]?.plain_text}
            </h1>
            
            {post.properties.Published?.date?.start && (
                <time className="text-gray-500 block mb-6">
                {formatDate(post.properties.Published.date.start)}
                </time>
            )}

            {/* Konten */}
            <div className="
            py-[6vw] text-justify w-[100%]
                    prose prose-2xl prose-headings:text-[4.6vw] prose-h2:text-[6vw] prose-h1:text-[6.8vw]  prose-p:text-[4.5vw] prose-li:text-[4.5vw] 

                    md:prose-headings:text-[3.6vw]  md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[3.5vw] md:prose-li:text-[3.5vw] prose-p:text-[#cccccc] prose-headings:text-white
                    
                    lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[2.1vw] lg:prose-h1:text-[3.2vw] lg:prose-p:text-[1.3vw] lg:prose-li:text-[1.3vw]
            ">
                {blocks.map(block => (
                <div key={block.id} className="mb-4">
                    {/* Tambahkan renderer untuk tiap tipe block Notion */}
                    {block.type === 'paragraph' && (
                    <p>{block.paragraph.rich_text[0]?.plain_text}</p>
                    )}
                    {block.type === 'heading_2' && (
                    <h2>{block.heading_2.rich_text[0]?.plain_text}</h2>
                    )}

                </div>
                ))}
            </div>
            </article>

        </main>
        <div
        className="
          px-[40px]
          md:px-[100px]
          lg:px-[150px] lg:py-[20px]">
          <Footer />
        </div>
    </>
  );
}