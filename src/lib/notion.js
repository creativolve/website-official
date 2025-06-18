  import { Client } from "@notionhq/client";
  import { unstable_cache } from 'next/cache';

  const notion = new Client({ auth: process.env.BLOG_API_KEY });

  export async function getDatabase() {
    const response = await notion.databases.query({
      database_id: process.env.BLOG_DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
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
  
    return {
      posts,
      _meta: {
        revalidatedAt: Date.now(),
        tags: ['notion-all'] // Tag global
      }
    };
  }

  export const getCachedDatabase = unstable_cache(
    async () => await getDatabase(),
    ['notion-all'],
    { tags: ['notion-all'] }
  );

  export async function getPage(pageId) {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  }

  export async function getBlocks(blockId) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
    });
    return response.results;
  }
