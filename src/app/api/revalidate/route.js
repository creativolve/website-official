// app/api/revalidate/route.js
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Authentication
    const secret = req.headers.get('x-secret');
    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      console.error("🚫 Unauthorized revalidation attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("❌ Invalid JSON in revalidate request:", error);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { 
      tags = [], 
      paths = [],
      type = 'both',
      pageId = null
    } = body;

    console.log("🔄 Revalidation request:", { tags, paths, type, pageId });

    const results = {
      success: true,
      revalidatedTags: [],
      revalidatedPaths: [],
      errors: [],
      timestamp: new Date().toISOString()
    };

    // Revalidate by tags
    if ((type === 'tag' || type === 'both') && tags.length > 0) {
      for (const tag of tags) {
        try {
          await revalidateTag(tag);
          results.revalidatedTags.push(tag);
          console.log(`✅ Tag revalidated: ${tag}`);
        } catch (error) {
          const errorMsg = `Failed to revalidate tag ${tag}: ${error.message}`;
          console.error(`❌ ${errorMsg}`);
          results.errors.push(errorMsg);
        }
      }
    }

    // Revalidate by paths
    if ((type === 'path' || type === 'both') && paths.length > 0) {
      for (const path of paths) {
        try {
          await revalidatePath(path);
          results.revalidatedPaths.push(path);
          console.log(`✅ Path revalidated: ${path}`);
        } catch (error) {
          const errorMsg = `Failed to revalidate path ${path}: ${error.message}`;
          console.error(`❌ ${errorMsg}`);
          results.errors.push(errorMsg);
        }
      }
    }

    // Force revalidation of critical cache entries
    if (pageId) {
      try {
        await revalidateTag(`post-${pageId}`);
        results.revalidatedTags.push(`post-${pageId}`);
        console.log(`✅ Specific post tag revalidated: post-${pageId}`);
      } catch (error) {
        const errorMsg = `Failed to revalidate post-${pageId}: ${error.message}`;
        console.error(`❌ ${errorMsg}`);
        results.errors.push(errorMsg);
      }
    }

    // Always revalidate global cache
    try {
      await revalidateTag('notion-all');
      if (!results.revalidatedTags.includes('notion-all')) {
        results.revalidatedTags.push('notion-all');
      }
      console.log("✅ Global notion cache revalidated");
    } catch (error) {
      const errorMsg = `Failed to revalidate global cache: ${error.message}`;
      console.error(`❌ ${errorMsg}`);
      results.errors.push(errorMsg);
    }

    // Return results
    if (results.errors.length > 0) {
      console.warn("⚠️ Revalidation completed with errors:", results.errors);
      return NextResponse.json({
        ...results,
        success: false,
        message: "Revalidation completed with errors"
      }, { status: 207 }); // 207 Multi-Status
    }

    console.log("✅ Revalidation completed successfully:", results);
    return NextResponse.json({
      ...results,
      message: "Revalidation completed successfully"
    });

  } catch (error) {
    console.error("💥 Unexpected error in revalidation:", error);
    return NextResponse.json(
      { 
        success: false,
        error: `Revalidation failed: ${error.message}`,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint untuk manual testing
export async function GET() {
  return NextResponse.json({
    message: "Revalidation endpoint is working",
    timestamp: new Date().toISOString(),
    usage: "Send POST request with tags/paths to revalidate"
  });
}