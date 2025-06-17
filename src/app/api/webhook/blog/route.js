export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Jika ini permintaan verifikasi
    if (body.verification_token) {
      console.log("✅ Verification Token diterima:", body.verification_token);

      // Berikan respon 200 (Notion tidak butuh balasan tertentu)
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Lanjutkan ke event normal...
    const { event } = body;
    if (!event) {
      return new Response(JSON.stringify({ error: "Missing event" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Revalidate
    const res = await fetch("https://creativolve.agency/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret": process.env.REVALIDATE_SECRET
      },
      body: JSON.stringify({ tags: ["notion-all"] })
    });

    const result = await res.json();

    return new Response(JSON.stringify({ success: true, revalidate: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("❌ Webhook error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
