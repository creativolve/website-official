export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Webhook verifikasi dengan "verify_token"
    if (body.verify_token) {
      console.log("📩 Verification request received:", body.verify_token);
      return new Response(JSON.stringify({ verify_token: body.verify_token }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Webhook verifikasi dengan "challenge" (Notion Events API)
    if (body.challenge) {
      console.log("📩 Challenge token dari Notion:", body.challenge);
      return new Response(JSON.stringify({ challenge: body.challenge }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Event normal
    console.log("✅ Webhook event diterima:", JSON.stringify(body, null, 2));

    // Validasi payload minimal
    if (!body.event || !body.database) {
      return new Response(JSON.stringify({ error: "Invalid webhook payload" }), { status: 400 });
    }

    // Kirim trigger ke revalidate
    const revalidate = await fetch("https://creativolve.agency/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret": process.env.REVALIDATE_SECRET,
      },
      body: JSON.stringify({ tags: ["notion-all"] }),
    });

    const result = await revalidate.json();

    return new Response(
      JSON.stringify({
        success: true,
        revalidateResult: result,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ ERROR webhook:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
