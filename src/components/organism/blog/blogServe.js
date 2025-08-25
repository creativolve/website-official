import { getCachedDatabase } from "@/lib/notion";
import { Suspense } from "react";
import BlogSectionWrapper from "./blogwraper";


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

// Server Component untuk fetch data
async function BlogData() {
  try {
    const data = await getCachedDatabase();
    const posts = Array.isArray(data) ? data : data?.posts || [];

    if (!posts.length) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-white">
          No Blog Posts Found
        </div>
      );
    }

    // lempar ke wrapper Client
    return <BlogSectionWrapper posts={posts} />; 
  } catch (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-red-400">
        Error loading blog: {error.message}
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
