// app/api/webhook/blog/route.js

export async function POST(req) {
    try {
      const body = await req.json();
  
      console.log("📩 Webhook dari Notion diterima:", JSON.stringify(body, null, 2));
  
      // Optional: validasi event
      const isValid = body && body.event && body.database;
      if (!isValid) {
        return new Response(JSON.stringify({ error: "Invalid webhook payload" }), {
          status: 400,
        });
      }
  
      // Trigger revalidate ke endpoint kamu
      const revalidate = await fetch("https://creativolve.agency/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret": process.env.REVALIDATE_SECRET, // simpan ini di .env
        },
        body: JSON.stringify({
          tags: ["notion-all"], // atau bisa per post: post-${id}
        }),
      });
  
      if (!revalidate.ok) {
        const errorText = await revalidate.text();
        console.error("❌ Gagal revalidate:", errorText);
        return new Response(JSON.stringify({ error: "Gagal trigger revalidate" }), {
          status: 500,
        });
      }
  
      const revalidateResult = await revalidate.json();
  
      return new Response(
        JSON.stringify({
          success: true,
          message: "Webhook diterima dan cache berhasil dihapus",
          revalidateResult,
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error("❌ Error di webhook handler:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }
  