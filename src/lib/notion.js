// lib/notion.js - Updated with better cache strategy and Service blocks
import { Client } from "@notionhq/client";
import { unstable_cache } from 'next/cache';

const notion = new Client({ auth: process.env.BLOG_API_KEY });
const serviceNotion = new Client({ auth: process.env.SERVICEPLAN_API_KEY });

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

// =================== SERVICE FUNCTIONS ===================

async function fetchServices() {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${process.env.SERVICENOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SERVICEPLAN_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  console.log("📥 Raw Notion response:", data);

  if (!data.results) {
    throw new Error(data.message || "Failed to fetch Notion services");
  }

  return data.results.map((item) => ({
    id: item.id,
    name: item.properties?.Name?.title?.[0]?.plain_text || "No title",
    price: item.properties?.Harga?.rich_text?.[0]?.plain_text || "-",
    desc: item.properties?.Deskripsi?.rich_text?.[0]?.plain_text || "",
    category: item.properties?.Select?.select?.name || "",
  }));
}

// Fetch service blocks untuk seluruh halaman
async function fetchServiceBlocks(serviceId) {
  try {
    const response = await serviceNotion.blocks.children.list({
      block_id: serviceId,
      page_size: 100,
    });

    const blocks = await Promise.all(
      response.results.map(async (block) => {
        if (block.type === "table") {
          // Ambil semua row dari table
          const rowsRes = await serviceNotion.blocks.children.list({
            block_id: block.id,
            page_size: 100,
          });
          return { ...block, rows: rowsRes.results };
        }
        return block;
      })
    );

    return blocks;
  } catch (error) {
    console.error(`❌ Error fetching service blocks ${serviceId}:`, error);
    return [];
  }
}


// Fetch services dengan blocks (complete data)
async function fetchServicesWithBlocks() {
  try {
    console.log("🔄 Fetching services with blocks...");
    
    // Fetch basic service data
    const services = await fetchServices();
    
    // Fetch blocks untuk setiap service
    const servicesWithBlocks = await Promise.all(
      services.map(async (service) => {
        try {
          const blocks = await fetchServiceBlocks(service.id);
          return {
            ...service,
            blocks: blocks,
            hasBlocks: blocks.length > 0
          };
        } catch (error) {
          console.warn(`⚠️ Failed to fetch blocks for service ${service.id}:`, error.message);
          return {
            ...service,
            blocks: [],
            hasBlocks: false
          };
        }
      })
    );
    
    console.log(`✅ Fetched ${servicesWithBlocks.length} services with blocks`);
    return servicesWithBlocks;
  } catch (error) {
    console.error("❌ Error fetching services with blocks:", error);
    throw error;
  }
}

// Basic services cache (tanpa blocks)

async function getBlockChildren(blockId) {
  const blocks = [];
  let cursor;

  do {
    const { results, next_cursor, has_more } =
      await serviceNotion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      });

    blocks.push(...results);
    cursor = has_more ? next_cursor : null;
  } while (cursor);

  return blocks;
}



export const getServices = unstable_cache(
  async () => {
    console.log("✅ Fetching Notion Services");
    return await fetchServices();
  },
  ["notion-services"],
  {
    tags: ["notion-all", "notion-services"],
    revalidate: 300, // 5 menit
  }
);

// Services dengan blocks cache
export const getServicesWithBlocks = unstable_cache(
  async () => {
    console.log("✅ Fetching Notion Services with Blocks");
    return await fetchServicesWithBlocks();
  },
  ["notion-services-with-blocks"],
  {
    tags: ["notion-all", "notion-services", "notion-service-blocks"],
    revalidate: 300, // 5 menit
  }
);

// Individual service dengan blocks
export const getServiceWithBlocks = unstable_cache(
  async (serviceId) => {
    try {
      // Fetch service data
      const services = await fetchServices();
      const service = services.find(s => s.id === serviceId);
      
      if (!service) {
        throw new Error(`Service with id "${serviceId}" not found`);
      }
      
      // Fetch blocks
      const blocks = await fetchServiceBlocks(serviceId);
      
      console.log(`✅ Found service with blocks: ${serviceId}`);
      return {
        ...service,
        blocks: blocks,
        hasBlocks: blocks.length > 0
      };
    } catch (error) {
      console.error(`❌ Error finding service with blocks ${serviceId}:`, error);
      throw error;
    }
  },
  ["notion-service-with-blocks"],
  {
    tags: ["notion-all", "notion-services", "notion-service-blocks"],
    revalidate: 300
  }
);

// Service blocks cache (untuk individual service blocks)
export const getCachedServiceBlocks = unstable_cache(
  async (serviceId) => {
    return await fetchServiceBlocks(serviceId);
  },
  ["notion-service-blocks"],
  {
    tags: ["notion-all", "notion-service-blocks"],
    revalidate: 300
  }
);

// Non-cached versions
export async function getFreshServices() {
  console.log("🆕 Fetching fresh services from Notion...");
  return await fetchServices();
}

export async function getFreshServicesWithBlocks() {
  console.log("🆕 Fetching fresh services with blocks from Notion...");
  return await fetchServicesWithBlocks();
}

export async function getServiceBlocks(serviceId) {
  return await fetchServiceBlocks(serviceId);
}