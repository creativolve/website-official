import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { answers, metadata } = body;

    if (!Array.isArray(answers) || !metadata?.name || !metadata?.businessName) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid data structure" }),
        { status: 400 }
      );
    }

    const formattedAnswers = answers.map(
      (answer) => `Pertanyaan: ${answer.question}\nJawaban: ${answer.answer}`
    ).join('\n\n');

    const prompt = `
Anda adalah asisten bisnis yang membantu menganalisis formulir pendaftaran yang disubmit oleh klien. Berdasarkan jawaban yang diberikan, buatkan brief yang terstruktur untuk tim, terdiri dari beberapa bagian berikut:

### 1. Profil Klien
- **Nama Klien:** ${metadata.name}
- **Bisnis:** ${metadata.businessName}
- **Latar Belakang Bisnis:** Berdasarkan jawaban klien, jelaskan latar belakang bisnis mereka dan alasan utama mereka ingin memulai proyek ini.
- **Tujuan Bisnis:** Apa tujuan utama yang ingin dicapai oleh klien dengan proyek ini? Misalnya, apakah untuk membangun brand awareness, meningkatkan engagement, memperkenalkan produk, dsb.
- **Pesan dan Nilai Utama:** Apa pesan atau nilai utama yang ingin disampaikan klien melalui proyek ini?

### 2. Discover Project
- **Deskripsi Proyek:** Berdasarkan jawaban klien, jelaskan deskripsi proyek secara umum dan tujuan utama dari proyek ini.
- **Layanan yang Dibutuhkan:** Sebutkan layanan yang diperlukan oleh klien (misalnya desain website, pengembangan aplikasi, kampanye pemasaran, dll).
- **Target Audiens:** Siapa target audiens atau pasar yang ingin dijangkau oleh klien dalam proyek ini? Jelaskan karakteristik audiens yang diinginkan.
- **Referensi Hasil Akhir:** Apakah klien memiliki gambaran atau referensi spesifik tentang hasil akhir yang diharapkan dari proyek ini?

### 3. Kebutuhan dan Kendala Teknis
- **Batasan Teknis:** Apakah ada batasan teknis yang perlu dipertimbangkan dalam pengerjaan proyek ini? Misalnya, ada teknologi tertentu yang harus digunakan atau sistem yang harus diintegrasikan.
- **Kendala dan Tantangan:** Apa saja tantangan atau kendala yang klien prediksi bisa muncul selama proyek ini berlangsung? Sertakan masalah teknis, logistik, atau risiko lainnya.

### 4. Timeline dan Deadline
- **Harapan Timeline:** Apa harapan klien terkait timeline proyek ini? Apakah ada deadline yang ketat atau event penting yang perlu dipertimbangkan?
- **Jadwal:** Tentukan waktu yang diperlukan untuk menyelesaikan proyek ini, apakah ada pembagian waktu tertentu atau milestone yang harus dicapai.

### 5. Aspek Penting dalam Proyek
- **Elemen Khusus yang Diinginkan:** Apakah ada aspek atau elemen khusus yang menurut klien sangat penting untuk ada dalam proyek ini? Misalnya, fitur atau desain tertentu yang harus disertakan.
- **Sumber Daya yang Tersedia:** Apakah klien memiliki sumber daya atau alat yang dapat digunakan dalam proyek ini? Ini bisa mencakup data yang sudah ada atau akses ke teknologi tertentu.

### 6. Kontribusi terhadap Perkembangan Bisnis
- **Pengaruh Proyek terhadap Bisnis:** Bagaimana klien melihat proyek ini berkontribusi terhadap perkembangan bisnis mereka? Apa tujuan jangka panjang yang ingin dicapai?

### 7. Informasi Tambahan
- **Informasi Tambahan:** Apakah ada hal lain yang perlu kami ketahui untuk membantu kami memahami kebutuhan klien dengan lebih baik? Misalnya, kebutuhan teknis khusus, target audiens yang lebih detail, atau kebutuhan lain yang belum disebutkan.

---

Gunakan bahasa yang profesional, jelas, dan mudah dimengerti. Tujuan dari brief ini adalah untuk memberikan pemahaman yang komprehensif kepada tim mengenai proyek yang sedang dijalankan.
`;



    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Anda adalah asisten bisnis yang ahli dalam menganalisis profil bisnis dan memberikan rekomendasi yang tepat."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-70b-8192", // ✅ ganti model agar valid
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
    });

    const analysis = completion.choices[0]?.message?.content || "Tidak dapat menghasilkan analisis";

    return new Response(JSON.stringify({
      success: true,
      data: {
        analysis,
        metadata
      }
    }), { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
