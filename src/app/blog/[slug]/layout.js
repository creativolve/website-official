export const dynamic = 'force-dynamic';

import { getCachedDatabase } from '@/lib/notion';


export async function generateMetadata({ params }) {
  // PENTING: Await params terlebih dahulu untuk Next.js 15
  const { slug } = await params;
  
  const { posts } = await getCachedDatabase();
  const post = posts.find(p => 
    p.properties.Slug?.rich_text?.[0]?.plain_text === slug
  );

  if (!post) return {
    title: "Artikel Tidak Ditemukan - Creativolve",
    description: "Halaman yang Anda cari tidak tersedia"
  };

  const title = post.properties.Title?.title?.[0]?.plain_text || "Artikel Tanpa Judul";
  const description = post.properties.Description?.rich_text?.[0]?.plain_text || "Temukan wawasan baru seputar bisnis digital";
  const coverUrl = post.coverUrl 
    ? `https://creativolve.agency${post.coverUrl}`
    : "https://creativolve.agency/images/Pusat-layanan/og-image.jpg";

  return {
    title: `${title} | Creativolve`,
    description,
    robots: "index, follow",
    openGraph: {
      title: `${title} | Creativolve`,
      description,
      url: `https://creativolve.agency/blog/${slug}`,
      type: "article",
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: post.properties.Published?.date?.start,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Creativolve`,
      description,
      images: [coverUrl],
    },
    alternates: {
      canonical: `https://creativolve.agency/blog/${slug}`,
    }
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}