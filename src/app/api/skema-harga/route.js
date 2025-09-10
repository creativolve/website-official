// app/api/notion/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.notion.com/v1/databases/YOUR_DATABASE_ID/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
