// /app/api/posts/route.js
import { getCachedDatabase } from "@/lib/notion";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; 

export async function GET() {
  const { posts } = await getCachedDatabase(); // Gunakan fungsi cache yang sama
  return NextResponse.json({ posts });
}