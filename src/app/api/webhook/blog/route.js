
// app/api/webhooks/blog/route.js
import { createHmac, timingSafeEqual } from "crypto";
import { forceRefreshCache } from "@/lib/notion";

export async function POST(req) {
  try {
    const verificationToken = process.env.NOTION_VERIFICATION_TOKEN;
    
    if (!verificationToken) {
      console.error("❌ NOTION_VERIFICATION_TOKEN tidak ditemukan");
      return new Response(JSON.stringify({ error: "Server configuration error" }), { 
        status: 500 
      });
    }

    const signatureHeader = req.headers.get("x-notion-signature");
    const rawBody = await req.text();
    
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      console.error("❌ Invalid JSON payload:", error);
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { 
        status: 400 
      });
    }

    // Handle verification token untuk initial setup
    if (body.verification_token) {
      console.log("🔐 Verification token received");
      
      if (body.verification_token === verificationToken) {
        console.log("✅ Token verification successful");
        return new Response(JSON.stringify({ 
          success: true,
          message: "Webhook verified successfully" 
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        console.error("❌ Token verification failed");
        return new Response(JSON.stringify({ error: "Invalid verification token" }), { 
          status: 401 
        });
      }
    }

    // Validate signature untuk webhook events
    if (signatureHeader) {
      const calculatedSignature = `sha256=${createHmac("sha256", verificationToken)
        .update(rawBody)
        .digest("hex")}`;

      const isValidSignature = timingSafeEqual(
        Buffer.from(calculatedSignature), 
        Buffer.from(signatureHeader)
      );

      if (!isValidSignature) {
        console.error("🚫 Signature validation failed");
        return new Response(JSON.stringify({ error: "Unauthorized" }), { 
          status: 401 
        });
      }
      
      console.log("✅ Signature validation successful");
    }

    // Process webhook events
    const eventType = body.type;
    const eventData = body.data;

    if (!eventType || !eventData) {
      console.log("⚠️ Incomplete payload:", body);
      return new Response(JSON.stringify({ 
        error: "Invalid payload - missing type or data" 
      }), { 
        status: 400 
      });
    }

    console.log("📦 Event received:", {
      type: eventType,
      pageId: eventData.id,
      timestamp: new Date().toISOString()
    });

    // Handle event and get affected resources
    const affectedResources = await handleNotionEvent(eventType, eventData);

    // Trigger comprehensive revalidation
    await triggerComprehensiveRevalidation(eventData.id, affectedResources);

    return new Response(JSON.stringify({
      success: true,
      message: "Webhook processed successfully",
      eventType: eventType,
      pageId: eventData.id,
      affectedResources
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("💥 Error processing webhook:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      details: error.message 
    }), { 
      status: 500 
    });
  }
}

async function handleNotionEvent(eventType, eventData) {
  const affectedResources = {
    tags: ['notion-all'],
    paths: ['/blog', '/'],
    shouldRevalidateHomepage: false
  };

  switch (eventType) {
    case 'page.content_updated':
      console.log("📝 Page content updated:", eventData.id);
      affectedResources.tags.push(`post-${eventData.id}`);
      affectedResources.paths.push(`/blog/${eventData.id}`);
      affectedResources.shouldRevalidateHomepage = true;
      break;
      
    case 'page.created':
      console.log("🆕 New page created:", eventData.id);
      affectedResources.tags.push(`post-${eventData.id}`, 'notion-posts');
      affectedResources.shouldRevalidateHomepage = true;
      break;
      
    case 'page.deleted':
      console.log("🗑️ Page deleted:", eventData.id);
      affectedResources.tags.push('notion-posts');
      affectedResources.shouldRevalidateHomepage = true;
      break;
      
    case 'database.schema_updated':
      console.log("🔄 Database schema updated:", eventData.id);
      affectedResources.tags.push('notion-database', 'notion-posts');
      affectedResources.shouldRevalidateHomepage = true;
      break;
      
    case 'page.property_updated':
      console.log("🔧 Page property updated:", eventData.id);
      affectedResources.tags.push(`post-${eventData.id}`, 'notion-posts');
      affectedResources.shouldRevalidateHomepage = true;
      break;
      
    default:
      console.log("❓ Unknown event type:", eventType);
  }

  return affectedResources;
}

async function triggerComprehensiveRevalidation(pageId, affectedResources) {
  try {
    await forceRefreshCache();
    console.log("✅ Cache force refreshed manually before tag/path revalidation");
    
    if (!process.env.REVALIDATE_SECRET) {
      console.warn("⚠️ REVALIDATE_SECRET not found, skipping revalidation");
      return;
    }

    const baseUrl = 'https://creativolve.agency';
    const revalidateUrl = `${baseUrl}/api/revalidate`;

    // Revalidate tags
    const tagResponse = await fetch(revalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret": process.env.REVALIDATE_SECRET,
      },
      body: JSON.stringify({ 
        tags: affectedResources.tags,
        type: 'tag'
      }),
    });

    if (!tagResponse.ok) {
      throw new Error(`Tag revalidation failed: ${tagResponse.status}`);
    }

    // Revalidate paths
    const pathResponse = await fetch(revalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret": process.env.REVALIDATE_SECRET,
      },
      body: JSON.stringify({ 
        paths: affectedResources.paths,
        type: 'path'
      }),
    });

    if (!pathResponse.ok) {
      throw new Error(`Path revalidation failed: ${pathResponse.status}`);
    }

    console.log("✅ Comprehensive revalidation completed");
    
    // Optional: Trigger ISR for critical pages
    if (affectedResources.shouldRevalidateHomepage) {
      await triggerISRRevalidation(baseUrl);
    }

  } catch (error) {
    console.error("💥 Error during comprehensive revalidation:", error);
    throw error;
  }
}

async function triggerISRRevalidation(baseUrl) {
  try {
    // Trigger ISR untuk homepage dan blog page
    const criticalPages = ['/', '/blog'];
    
    const promises = criticalPages.map(async (page) => {
      try {
        const response = await fetch(`${baseUrl}${page}`, {
          method: 'HEAD',
          headers: {
            'Cache-Control': 'no-cache',
            'x-revalidate': 'true'
          }
        });
        console.log(`✅ ISR triggered for ${page}: ${response.status}`);
      } catch (error) {
        console.warn(`⚠️ ISR failed for ${page}:`, error.message);
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error("💥 Error during ISR revalidation:", error);
  }
}