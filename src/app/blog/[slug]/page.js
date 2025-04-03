  import fs from 'fs';
  import path from 'path';
  import matter from 'gray-matter';
  import { remark } from 'remark';
  import html from 'remark-html';
  import blogs from '@/data/blog.json';
  import FooterBlog from '@/components/footer-blog';

  import '@/css/typografi.css'

  import Link from 'next/link';
  import Image from 'next/image';
import { notFound } from 'next/navigation';

  export async function generateStaticParams() {
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  }

  async function getBlog(slug) {
      const blog = blogs?.find((b) => b.slug === slug);
      if (!blog) return notFound();
    
      const filePath = path.join(process.cwd(), 'post', blog.name);
      if (!fs.existsSync(filePath)) return notFound();
    
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
        
        const blog = blogs.find((b) => b.slug === slug);

        const { content } = await getBlog(slug);
        if (!blog) return <div>Blog tidak ditemukan</div>;

        const blogIndex = blogs.findIndex((b) => b.slug === slug)
        const nextArticle = blogIndex !== -1 ? blogs[blogIndex + 1] || null : null;
    
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
        py-[17vw] flex flex-col gap-16 mb-[170px]
        lg:gap-10 lg:py-[5vw] lg:mb-0
        '>
                  <header
            className='
            flex flex-col gap-3 m-auto w-[85%]
            lg:w-[50%] lg:gap-8
            '>
              <div 
              className="
              image transition-all duration-200 ease-in-out

              hover:translate-y-[-15px] hover:scale-[1.012] group
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
                w-[100%] rounded-2xl pointer-events-none select-none transition-all duration-200 ease-in-out
                lg:rounded-4xl 

                group-hover:shadow-2xl
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

            <div className="link mt-30">
              <div className="">
                <Link href='/blog'
                className='
                underline decoration-solid text-blue-600 hover:text-black
                '>
                  Beranda
                </Link>

                {nextArticle && (                
                  <Link href={`/blog/${nextArticle.slug}`}
                  className='
                  underline decoration-solid text-blue-600 hover:text-black
                  '>
                    Artikel Berikutnya
                  </Link>
                )}
              </div>
            </div>

          </main>

        </section>
        <FooterBlog />
        </>
      );
    }
    