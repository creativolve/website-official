  import fs from 'fs';
  import path from 'path';
  import matter from 'gray-matter';
  import { remark } from 'remark';
  import html from 'remark-html';
  import blogs from '@/data/blog.json';

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
        <div className="max-w-3xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
          <p className="text-gray-500 text-sm mb-6">{blog?.date}</p>
          <div
            className="prose prose-lg prose-headings:text-[20vw]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      );
    }
    