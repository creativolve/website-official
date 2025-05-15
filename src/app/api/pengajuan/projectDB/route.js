import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";

const notion = new Client({ auth: process.env.PROJECT_DB_API_KEY });
const databaseId = process.env.PROJECT_DATABASE_ID;

const projectId = nanoid(10);

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      name,
      businessName,
      email,
      phone,
      businessType,
      kategori,
      budget,
      description,
    } = data;

    // Validasi field
    if (
      !name ||
      !businessName ||
      !email ||
      !phone ||
      !businessType ||
      !kategori ||
      !budget ||
      !description
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const cleanedBudget = budget.replace(/\./g, "");
const budgetNumber = parseInt(cleanedBudget);



    const formattedBudget = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(budget);


    function processDescriptionBlocks(description) {
      const blocks = [];
      const sections = description.split('\n'); // Pisahkan berdasarkan baris baru
      
      for (const section of sections) {
        if (section.startsWith('# ')) {
          // Jika baris dimulai dengan #, buat heading_2
          blocks.push({
            object: "block",
            type: "heading_1",
            heading_1: {
              rich_text: [{
                type: "text",
                text: { content: section.replace('# ', '') }
              }]
            }
          });
        } else if (section.startsWith('## ')){
          blocks.push({
            object: "block",
            type: "heading_2",
            heading_2: {
              rich_text: [{
                type: "text",
                text: { content: section.replace('## ', '') }
              }]
            }
          });
        } else if (section.startsWith('### ')){
          blocks.push({
            object: "block",
            type: "heading_3",
            heading_3: {
              rich_text: [{
                type: "text",
                text: { content: section.replace('### ', '') }
              }]
            }
          });
        } else if (section.trim()) {
          // Untuk teks biasa, buat paragraph
          // Bagi teks panjang menjadi chunk 2000 karakter
          const chunkSize = 2000;
          for (let i = 0; i < section.length; i += chunkSize) {
            blocks.push({
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{
                  type: "text",
                  text: { content: section.substring(i, i + chunkSize) }
                }]
              }
            });
          }
        }
      }
      
      return blocks;
    }


    // Format kategori untuk multi_select
    const layananOptions = Array.isArray(kategori) 
      ? kategori.map(item => ({ 
          name: item.label || item.value || String(item) 
        }))
      : [{ name: String(kategori) }];

   await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        "Nama Bisnis": { rich_text: [{ text: { content: businessName } }] },
        Email: { email: email },
        "Id Project": {
          rich_text: [{ text: { content: projectId } }],
        },
        Whatsapp: { phone_number: phone },
        "Kategori Klien": {
          select: { name: businessType.label || businessType.value || String(businessType) },
        },
        Layanan: {
          multi_select: layananOptions,
        },
        Budget: { number: budgetNumber },
        "Project Diajukan": { 
          date: { 
            start: new Date().toISOString() 
          } 
        },
      },
      children: processDescriptionBlocks(description) 
    }); // Simpan ke Notion
    


    // Kirim WhatsApp ke tim
    const waMessage = `*Ajuan Project Dari Klien! Mohon Di Cek Segera*\n_Berikut Data Klien, untuk memudahkan Peninjauan Project pada database:_\n\n*Key Project:* ${projectId}\n*Nama:* ${name}\n*Dari Bisnis:* ${businessName}\n*No Whatsapp:* ${phone}\n*Kategori:* ${
      kategori && Array.isArray(kategori)
        ? kategori.map((k) => k.label || "").join(", ")
        : "Tidak ada kategori"
    }\n*Budget:* ${formattedBudget}`;

    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=6288289158984&text=${encodeURIComponent(
        waMessage
      )}&apikey=${process.env.CALLMEBOT_API_KEY}`
    );

    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=6285159128773&text=${encodeURIComponent(
        waMessage
      )}&apikey=${process.env.CALLMEBOTKHAL_API_KEY}`
    );

    // Kirim Email konfirmasi
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USERNAME,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Creativolve Agency" <noreply@creativolve.agency>',
      to: email,
      subject: "Pengajuan Project Telah Kami Terima!",
      html: `
        <html>
          <body style="margin: 0; padding: 0; overflow-x: hidden; font-family: sans-serif; background-color: #171717;">
            <table style="background-color: #171717; width: 88%; margin: 5 auto; border-radius: 20px; padding: 20px;">
              <tr>
                <td>
                  <img src="https://creativolve.agency/images/logo-email.png" alt="logo" style="width: clamp(200px, 50%, 500px);" />
                  <h1 style="color: white;">Pengajuan Kamu Telah Diterima Oleh Kami</h1>
                  <p style="color: #cccccc;">Halo ${name} (${businessName})</p>
                  <p style="color: #cccccc;">
                    Terima kasih telah mempercayakan kami untuk mengerjakan proyek Anda. Tim kami akan segera menindaklanjuti dan menghubungi Anda dalam waktu dekat.
                  </p>
                  <p style="color: #cccccc;">
                    Jika ada informasi tambahan yang ingin Anda sampaikan, silakan balas email ini kapan saja.
                  </p>
                  <br />
                  <p style="color: #cccccc;">Salam,</p>
                  <p style="color: white;">Creativolve Agency<br/>creativolve.agency@gmail.com</p>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Data berhasil disimpan di Notion dan email berhasil dikirim!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { 
        error: "Gagal mengirim email atau menyimpan data",
        details: error.message 
      },
      { status: 500 }
    );
  }
}
