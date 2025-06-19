// lib/notion.js - Updated with better cache strategy
import { Client } from "@notionhq/client";
import { unstable_cache } from 'next/cache';

const notion = new Client({ auth: process.env.BLOG_API_KEY });

export async function getDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.BLOG_DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Published",
          direction: "descending",
        },
      ],
    });

    const posts = response.results.map((post) => {
      const driveLink = post.properties["Drive Image Link"]?.rich_text?.[0]?.plain_text;

      const convertDriveUrl = (url) => {
        if (!url) return null;
        const fileId = url.match(/\/file\/d\/([^\/]+)/)?.[1];
        return fileId
          ? `https://drive.google.com/uc?export=view&id=${fileId}`
          : null;
      };

      return {
        ...post,
        coverUrl: convertDriveUrl(driveLink) || "/default-cover.jpg",
        _tags: ['notion-posts', `post-${post.id}`]
      };
    });

    console.log(`✅ Fetched ${posts.length} posts from Notion`);

    return {
      posts,
      _meta: {
        revalidatedAt: Date.now(),
        postsCount: posts.length,
        tags: ['notion-all', 'notion-posts']
      }
    };
  } catch (error) {
    console.error("❌ Error fetching from Notion:", error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

// Fresh database fetch (no cache)
export async function getFreshDatabase() {
  console.log("🆕 Fetching fresh data from Notion...");
  return await getDatabase();
}

// Cached version dengan multiple tags dan revalidate yang lebih pendek
export const getCachedDatabase = unstable_cache(
  async () => await getDatabase(),
  ['notion-database-query'],
  { 
    tags: ['notion-all', 'notion-posts', 'blog-homepage'],
    revalidate: 60 // 5 menit - lebih pendek untuk data yang lebih fresh
  }
);

// Individual post cache dengan tag yang lebih spesifik
export const getCachedPost = unstable_cache(
  async (pageId) => {
    try {
      const response = await notion.pages.retrieve({ page_id: pageId });
      console.log(`✅ Fetched individual post: ${pageId}`);
      return response;
    } catch (error) {
      console.error(`❌ Error fetching post ${pageId}:`, error);
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  },
  ['notion-page'],
  {
    tags: ['notion-all', 'notion-pages'],
    revalidate: 300 // 5 menit
  }
);

// Blocks cache untuk post content
export const getCachedBlocks = unstable_cache(
  async (blockId) => {
    try {
      const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
      });
      
      console.log(`✅ Fetched ${response.results.length} blocks for ${blockId}`);
      return response.results;
    } catch (error) {
      console.error(`❌ Error fetching blocks ${blockId}:`, error);
      throw new Error(`Failed to fetch blocks: ${error.message}`);
    }
  },
  ['notion-blocks'],
  {
    tags: ['notion-all', 'notion-blocks'],
    revalidate: 300
  }
);

// Cache untuk post berdasarkan slug dengan tag spesifik
export const getCachedPostBySlug = unstable_cache(
  async (slug) => {
    try {
      const { posts } = await getDatabase(); // Gunakan fresh data untuk slug
      const post = posts.find(p => 
        p.properties.Slug?.rich_text?.[0]?.plain_text === slug
      );
      
      if (!post) {
        throw new Error(`Post with slug "${slug}" not found`);
      }
      
      console.log(`✅ Found post by slug: ${slug}`);
      return post;
    } catch (error) {
      console.error(`❌ Error finding post by slug ${slug}:`, error);
      throw error;
    }
  },
  ['notion-post-by-slug'],
  {
    tags: ['notion-all', 'notion-posts'],
    revalidate: 300
  }
);

// Non-cached versions untuk webhook updates
export async function getPage(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
}

export async function getBlocks(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  return response.results;
}

// Utility function untuk mendapatkan post berdasarkan slug
export async function getPostBySlug(slug) {
  return await getCachedPostBySlug(slug);
}

// Health check function
export async function checkNotionConnection() {
  try {
    await notion.databases.retrieve({
      database_id: process.env.BLOG_DATABASE_ID
    });
    return { status: 'connected', timestamp: new Date().toISOString() };
  } catch (error) {
    console.error("❌ Notion connection failed:", error);
    return { 
      status: 'error', 
      error: error.message, 
      timestamp: new Date().toISOString() 
    };
  }
}

// Function untuk force refresh cache secara manual
export async function forceRefreshCache() {
  try {
    console.log("🔄 Force refreshing all caches...");
    
    // Fetch fresh data
    const freshData = await getFreshDatabase();
    
    console.log("✅ Cache force refresh completed");
    return freshData;
  } catch (error) {
    console.error("❌ Error force refreshing cache:", error);
    throw error;
  }
}