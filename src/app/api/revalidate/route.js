import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // ✅ STEP 1: Authentication
    const secret = req.headers.get('x-secret');
    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      console.error("🚫 Unauthorized revalidation attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ STEP 2: Parse request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("❌ Invalid JSON in revalidate request:", error);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { 
      tags = ['notion-all', `post-${pageId}`], 
      paths = [],
      type = 'tag' // 'tag', 'path', or 'both'
    } = body;

    console.log("🔄 Revalidation request:", { tags, paths, type });

    const results = {
      success: true,
      revalidatedTags: [],
      revalidatedPaths: [],
      timestamp: new Date().toISOString()
    };

    // ✅ STEP 3: Revalidate by tags
    if (type === 'tag' || type === 'both') {
      try {
        const tagPromises = tags.map(async (tag) => {
            await revalidateTag(tag);
            console.log(`✅ Tag revalidated: ${tag}`);
            return tag;
          });
          results.revalidatedTags = await Promise.all(tagPromises);
      } catch (error) {
        console.error("❌ Error revalidating tags:", error);
        return NextResponse.json({
          error: `Tag revalidation failed: ${error.message}`
        }, { status: 500 });
      }
    }

    // ✅ STEP 4: Revalidate by paths
    if (type === 'path' || type === 'both') {
      try {
        const pathPromises = paths.map(async (path) => {
          await revalidatePath(path);
          console.log(`✅ Path revalidated: ${path}`);
          return path;
        });
        
        results.revalidatedPaths = await Promise.all(pathPromises);
      } catch (error) {
        console.error("❌ Error revalidating paths:", error);
        return NextResponse.json({
          error: `Path revalidation failed: ${error.message}`
        }, { status: 500 });
      }
    }

    console.log("✅ Revalidation completed successfully:", results);
    return NextResponse.json(results);

  } catch (error) {
    console.error("💥 Unexpected error in revalidation:", error);
    return NextResponse.json(
      { error: `Revalidation failed: ${error.message}` },
      { status: 500 }
    );
  }
}