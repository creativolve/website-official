// app/api/webhooks/notion/route.js
import { createHmac, timingSafeEqual } from "crypto";

export async function POST(req) {
  try {
    // Ambil verification token dari environment
    const verificationToken = process.env.NOTION_VERIFICATION_TOKEN;
    
    if (!verificationToken) {
      console.error("❌ NOTION_VERIFICATION_TOKEN tidak ditemukan di environment");
      return new Response(JSON.stringify({ error: "Server configuration error" }), { 
        status: 500 
      });
    }

    // Ambil signature dari header
    const signatureHeader = req.headers.get("x-notion-signature");
    
    // Ambil raw body untuk signature verification
    const rawBody = await req.text();
    
    // Parse JSON body
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      console.error("❌ Invalid JSON payload:", error);
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { 
        status: 400 
      });
    }

    // ✅ STEP 1: Handle verification token (initial subscription verification)
    if (body.verification_token) {
      console.log("🔐 Verification token diterima:", body.verification_token);
      
      // Verifikasi bahwa token cocok dengan yang diharapkan
      if (body.verification_token === verificationToken) {
        console.log("✅ Token verification berhasil");
        return new Response(JSON.stringify({ 
          success: true,
          message: "Webhook verified successfully" 
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        console.error("❌ Token verification gagal - token tidak cocok");
        return new Response(JSON.stringify({ error: "Invalid verification token" }), { 
          status: 401 
        });
      }
    }

    // ✅ STEP 2: Validate signature untuk event biasa
    if (signatureHeader) {
      // Hitung signature menggunakan raw body
      const calculatedSignature = `sha256=${createHmac("sha256", verificationToken)
        .update(rawBody)
        .digest("hex")}`;

      // Bandingkan signature secara timing-safe
      const isValidSignature = timingSafeEqual(
        Buffer.from(calculatedSignature), 
        Buffer.from(signatureHeader)
      );

      if (!isValidSignature) {
        console.error("🚫 Signature validation gagal");
        console.error("Expected:", calculatedSignature);
        console.error("Received:", signatureHeader);
        return new Response(JSON.stringify({ error: "Unauthorized" }), { 
          status: 401 
        });
      }
      
      console.log("✅ Signature validation berhasil");
    } else {
      console.warn("⚠️ Tidak ada X-Notion-Signature header");
    }

    // ✅ STEP 3: Process webhook events
    const eventType = body.type;
    const eventData = body.data;

    if (!eventType || !eventData) {
      console.log("⚠️ Payload tidak lengkap:", body);
      return new Response(JSON.stringify({ 
        error: "Invalid payload - missing type or data" 
      }), { 
        status: 400 
      });
    }

    console.log("📦 Event diterima:", {
      type: eventType,
      pageId: eventData.id,
      timestamp: new Date().toISOString()
    });

    // Handle berbagai tipe event
    await handleNotionEvent(eventType, eventData);

    // ✅ STEP 4: Trigger cache revalidation
    await triggerRevalidation();

    return new Response(JSON.stringify({
      success: true,
      message: "Webhook processed successfully",
      eventType: eventType,
      pageId: eventData.id
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("💥 Error processing webhook:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error" 
    }), { 
      status: 500 
    });
  }
}

// Fungsi untuk handle berbagai tipe event
async function handleNotionEvent(eventType, eventData) {
  switch (eventType) {
    case 'page.content_updated':
      console.log("📝 Page content updated:", eventData.id);
      // Tambahkan logic khusus untuk update konten page
      break;
      
    case 'page.created':
      console.log("🆕 New page created:", eventData.id);
      // Tambahkan logic khusus untuk page baru
      break;
      
    case 'page.deleted':
      console.log("🗑️ Page deleted:", eventData.id);
      // Tambahkan logic khusus untuk page dihapus
      break;
      
    case 'database.schema_updated':
      console.log("🔄 Database schema updated:", eventData.id);
      // Tambahkan logic khusus untuk perubahan schema database
      break;
      
    case 'comment.created':
      console.log("💬 Comment created:", eventData.id);
      // Tambahkan logic khusus untuk comment baru
      break;
      
    default:
      console.log("❓ Unknown event type:", eventType);
  }
}

// Fungsi untuk trigger revalidation
async function triggerRevalidation() {
  try {
    if (!process.env.REVALIDATE_SECRET) {
      console.warn("⚠️ REVALIDATE_SECRET tidak ditemukan, skip revalidation");
      return;
    }

    const revalidateUrl = `${process.env.NEXTAUTH_URL || 'https://creativolve.agency'}/api/revalidate`;
    
    const res = await fetch(revalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret": process.env.REVALIDATE_SECRET,
      },
      body: JSON.stringify({ 
        tags: ["notion-all", "notion-pages", "notion-database"] 
      }),
    });

    if (res.ok) {
      const result = await res.json();
      console.log("✅ Cache revalidation berhasil:", result);
    } else {
      console.error("❌ Cache revalidation gagal:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("💥 Error during revalidation:", error);
  }
}