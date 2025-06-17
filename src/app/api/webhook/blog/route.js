import { createHmac, timingSafeEqual } from "crypto";

// HARUS pakai .text() dulu agar bisa hash body
export async function POST(req) {
  try {
    const rawBody = await req.text(); // ambil raw body
    const signature = req.headers.get("x-notion-signature"); // header dari Notion
    const verificationToken = process.env.NOTION_VERIFICATION_TOKEN; // simpan di .env

    if (!signature || !verificationToken) {
      console.error("🚫 Signature atau token kosong");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Hitung HMAC dari raw body
    const calculatedSignature = `sha256=${createHmac("sha256", verificationToken)
      .update(rawBody)
      .digest("hex")}`;

    const isTrusted = timingSafeEqual(
      Buffer.from(calculatedSignature),
      Buffer.from(signature)
    );

    if (!isTrusted) {
      console.error("🚨 Signature TIDAK cocok!");
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 401 });
    }

    // Parse ulang body karena tadi kita pakai .text()
    const body = JSON.parse(rawBody);

    // Handle verification step (satu kali saat setup)
    if (body.verification_token) {
      console.log("✅ Verifikasi awal diterima:", body.verification_token);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Handle event
    const { event } = body;
    if (!event) {
      console.log("⚠️ Event kosong");
      return new Response(JSON.stringify({ error: "Missing event" }), { status: 200 });
    }

    // Trigger revalidate
    const revalidate = await fetch("https://creativolve.agency/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret": process.env.REVALIDATE_SECRET,
      },
      body: JSON.stringify({ tags: ["notion-all"] }),
    });

    const result = await revalidate.json();

    return new Response(JSON.stringify({ success: true, revalidate: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("❌ Webhook Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
