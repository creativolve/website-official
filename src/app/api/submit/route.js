import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import nodemailer from "nodemailer";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      name,
      businessName,
      email,
      phone,
      duration,
      businessType,
      topicTitle,
      description,
    } = data;

    // Validasi data
    if (
      !name ||
      !businessName ||
      !email ||
      !phone ||
      !duration ||
      !topicTitle ||
      !description ||
      !businessType
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Kirim data ke Notion
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        "Nama Bisnis": { rich_text: [{ text: { content: businessName } }] },
        Email: { email: email },
        Telepon: { phone_number: phone },
        Durasi: { rich_text: [{ text: { content: duration } }] },
        "Jenis Bisnis": { select: { name: businessType } },
        "Judul Diskusi": { rich_text: [{ text: { content: topicTitle } }] },
        Deskripsi: { rich_text: [{ text: { content: description } }] },
        "Tanggal Dikirim": { date: { start: new Date().toISOString() } },
      },
    });



    // ADNAN WA
    await fetch(`https://api.callmebot.com/whatsapp.php?phone=6288289158984&text=${encodeURIComponent(`*Ajuan Diskusi!*\n*Nama:* ${name}\n*Dari Bisnis:* ${businessName}\n*No Whatsapp:* ${phone}\n*Mengenai Topik:* ${topicTitle}\n*Deskripsi:* \n${description}`)}&apikey=${process.env.CALLMEBOT_API_KEY}`);



    // kHALIF WA
    await fetch(`https://api.callmebot.com/whatsapp.php?phone=6285159128773&text=${encodeURIComponent(`*Ajuan Diskusi!*\n*Nama:* ${name}\n*Dari Bisnis:* ${businessName}\n*No Whatsapp:* ${phone}\n*Mengenai Topik:* ${topicTitle}\n*Deskripsi:* \n${description}`)}&apikey=${process.env.CALLMEBOTKHAL_API_KEY}`);





    // Kirim email menggunakan SMTP Brevo
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // Set to true if using port 465
      auth: {
        user: process.env.BREVO_SMTP_USERNAME,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Creativolve Agency" <noreply@creativolve.agency>',
      to: email,
      replyTo: null,
      subject: "Diskusi Telah Kami Terima!",
      html: `
          <html>
  <body style="margin: 0; padding: 0; overflow-x: hidden; font-family: sans-serif; background-color: #171717;">
    <table role="presentation" style="background-color: #171717; width: 88%; margin: 5 auto; border-radius: 20px; padding: 20px;">
      <tr>
        <td>
          <img src="https://creativolve.agency/images/logo-email.png" alt="logo" style="width: clamp(200px, 50%, 500px);" />
          <h1 style="color: white; font-weight: bold; font-size: clamp(1.5rem, 6vw, 2rem);">
            Pengajuan Kamu Telah Diterima Oleh Kami
          </h1>
          <p style="color: #cccccc; font-size: clamp(1rem, 3vw, 1rem); font-weight: normal;">
            Halo ${name} (${businessName})
          </p>
          <p style="color: #cccccc; font-size: clamp(0.9rem, 3vw, 1rem); font-weight: normal;">
            Terima kasih telah mempercayakan kami untuk mendiskusikan masalah atau proyek yang ingin Anda selesaikan. Kami sangat menghargai kesempatan untuk bekerja sama dan memberikan solusi terbaik bagi kebutuhan Anda.
          </p>
          <p style="color: #cccccc; font-size: clamp(0.9rem, 3vw, 1rem); font-weight: normal;">
            Tim kami sedang memproses pengajuan Anda, dan kami akan segera menghubungi Anda untuk melanjutkan pembahasan lebih lanjut. Kami ingin memastikan bahwa setiap detail dapat dipahami dengan baik agar hasilnya sesuai dengan harapan Anda.
          </p>
          <p style="color: #cccccc; font-size: clamp(0.9rem, 3vw, 1rem); font-weight: normal;">
            Semoga kita bisa bekerja sama dengan baik untuk mewujudkan proyek ini. Jika ada hal lain yang perlu Anda tanyakan atau klarifikasi, jangan ragu untuk menghubungi kami kapan saja. Kami siap membantu Anda.
          </p>
          <br />
          <p style="font-weight: medium; color: #cccccc; font-size: clamp(0.6rem, 2vw, 0.8rem);">
            Salam,
          </p>
          <p style="font-weight: bold; color: white; font-size:  clamp(0.6rem, 2vw, 0.8rem);">
            Creativolve Agency <br/> creativolve.agency@gmail.com
          </p>
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
      { error: "Gagal mengirim email atau menyimpan data" },
      { status: 500 }
    );
  }
}
