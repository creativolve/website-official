// app/api/submit/route.js
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, businessName, email, phone, duration, businessType, topicTitle, description } = data;

    if (!name || !businessName || !email || !phone || !duration || !topicTitle || !description || !businessType) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    // Kirim data ke Notion
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: name } }],
        },
        "Nama Bisnis": {
          rich_text: [{ text: { content: businessName } }],
        },
        Email: {
          email: email,
        },
        Telepon: {
          phone_number: phone,
        },
        Durasi: {
          rich_text: [{ text: { content: duration } }],
        },
        "Jenis Bisnis": {
          select: { name: businessType },
        },
        "Judul Diskusi": {
          rich_text: [{ text: { content: topicTitle } }],
        },
        Deskripsi: {
          rich_text: [{ text: { content: description } }],
        },
      },
    });

    return NextResponse.json({ message: 'Data berhasil disimpan di Notion!' }, { status: 200 });

    
  } catch (error) {
    console.error('Error kirim ke Notion:', error);
    return NextResponse.json({ error: 'Gagal menyimpan ke Notion' }, { status: 500 });
  }
}
