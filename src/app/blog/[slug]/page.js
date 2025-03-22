  import fs from 'fs';
  import path from 'path';
  import matter from 'gray-matter';
  import { remark } from 'remark';
  import html from 'remark-html';
  import blogs from '@/data/blog.json';

  import '@/css/typografi.css'

  import Link from 'next/link';
  import Image from 'next/image';

  export async function generateStaticParams() {
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  }

  async function getBlog(slug) {
      const blog = blogs?.find((b) => b.slug === slug);
      if (!blog) throw new Error(`Blog dengan slug "${slug}" tidak ditemukan`);
    
      const filePath = path.join(process.cwd(), 'post', blog.name);
      if (!fs.existsSync(filePath)) throw new Error(`File tidak ditemukan: ${filePath}`);
    
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
    
      const processedContent = await remark().use(html).process(content);
      const htmlContent = processedContent.toString();
    
      return {
        metadata: data,
        content: htmlContent,
      };
    }



    

    export default async function BlogDetail({ params }) {
      const { slug } = await params; // Pakai await untuk destructuring params
      
      if (!slug) return <div>Loading...</div>;
    
      const { content } = await getBlog(slug);
      const blog = blogs.find((b) => b.slug === slug);
    
      if (!blog) return <div>Blog tidak ditemukan</div>;
    
      return (
        <>
        <Image
        src="/images/blog/background.png"
        alt={blog?.title}
        width={300}
        height={300}
        className='
        w-full absolute object-cover z-[-30] h-[50vh] top-[-20px] opacity-[0.2] pointer-events-none select-none
        lg:h-[90vh] lg:opacity-[0.04] 
        '
        />
        <section
        className='
        py-[17vw] flex flex-col gap-16
        lg:gap-10 lg:py-[5vw]
        '>
                  <header
            className='
            flex flex-col gap-3 m-auto w-[85%]
            lg:w-[50%] lg:gap-8
            '>
              <div 
              className="
              image
              ">
                <Image
                src={blog?.thumbnail}
                width={800}
                height={800}
                priority
                quality={98}
                fetchPriority='high'
                alt={blog?.title}
                className='
                w-[100%] rounded-2xl pointer-events-none select-none
                lg:rounded-4xl
                '
                />
              </div>
              <div 
              className="
              heading flex flex-col gap-1
              lg:gap-3
              ">  
                <h1
                className="
                font-bold text-[8vw] leading-[9.5vw]
                lg:text-[4.3vw] lg:leading-[5.5vw]
                ">
                  {blog?.title}
                </h1>
                <p
                className="
                text-gray-500 text-[4vw]
                lg:text-[1.3vw]
                ">
                  {blog?.date}
                </p>
              </div>
          </header>
          <main 
          className="
          m-auto w-[85%]
          lg:w-[50%]
          ">
            <article
            dangerouslySetInnerHTML={{ __html: content }}
            className="
              py-[6vw] text-justify w-[100%]
              prose prose-2xl prose-headings:text-[4.6vw] prose-h2:text-[6vw] prose-h1:text-[6.8vw]  prose-p:text-[4.5vw] prose-li:text-[4.5vw]

              md:prose-headings:text-[3.6vw]  md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[3.5vw] md:prose-li:text-[3.5vw]
              
              lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[2.1vw] lg:prose-h1:text-[3.2vw] lg:prose-p:text-[1.3vw] lg:prose-li:text-[1.3vw]
            "
            />

            <div className="back-button mt-30">
              <Link href='/blog/search'>
                <button
                className='
                bg-[#212121] text-white px-[20px] py-[6px] rounded-2xl pointer-events-auto cursor-pointer
                '>
                  Beranda Blog
                </button>
              </Link>
            </div>

          </main>

        </section>
        </>
      );
    }
    