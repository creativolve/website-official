import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  // 1. Autentikasi
    const secret = req.headers.get('x-secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  // 2. Ambil parameter
  const { tags = ['notion-all'] } = await req.json();

  try {
    // 3. Revalidasi berdasarkan tag
    await Promise.all(tags.map(tag => revalidateTag(tag)));

    return NextResponse.json({
      success: true,
      revalidatedTags: tags
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Revalidation failed: ${error.message}` },
      { status: 500 }
    );
  }
}