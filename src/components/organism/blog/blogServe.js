import { getCachedDatabase } from "@/lib/notion";
import BlogSection from "./blog";
import { Suspense } from "react";

// Loading component
function BlogLoading() {
  return (
    <div className="w-full h-[400px] bg-[#21252C] rounded-[15px] p-[15px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00E5FF]"></div>
        <p className="text-white text-lg">Loading blog posts...</p>
      </div>
    </div>
  );
}

// Server component untuk fetch data
async function BlogData() {
  try {
    console.log("BlogData: Fetching from Notion...");
    const data = await getCachedDatabase();
    
    let posts = [];
    if (data?.posts) {
      posts = data.posts;
    } else if (Array.isArray(data)) {
      posts = data;
    }
    
    console.log(`BlogData: Found ${posts.length} posts`);
    
    if (!posts.length) {
      return (
        <div className="w-full h-[400px] bg-[#21252C] rounded-[15px] p-[15px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-yellow-400 text-lg font-semibold">
              📝 No Blog Posts Found
            </div>
            <div className="text-gray-400 text-sm">
              Make sure your Notion database has published posts
            </div>
          </div>
        </div>
      );
    }

    return <BlogSection posts={posts} />;
    
  } catch (error) {
    console.error("BlogData Error:", error);
    
    return (
      <div className="w-full h-[400px] bg-[#21252C] rounded-[15px] p-[15px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-400 text-lg font-semibold">
            ❌ Error Loading Blog
          </div>
          <div className="text-gray-400 text-sm">
            {error.message}
          </div>
          <div className="text-xs text-gray-500 bg-gray-800 p-3 rounded max-w-md">
            Check your Notion API configuration
          </div>
        </div>
      </div>
    );
  }
}

export default function BlogServe() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogData />
    </Suspense>
  );
}