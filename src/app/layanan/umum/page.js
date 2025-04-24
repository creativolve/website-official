"use client";

import BreadcrumbNav from "@/components/breadCrumbs-layanan";
import Button from "@/components/button";
import Footer from "@/components/footer";

import "@/css/typografi.css";

export default function LayananUmum() {
  return (
    <>
      <BreadcrumbNav index={1} />
      <main
        className="
           py-[6vw] text-left w-[100%] m-auto px-[20px] pb-60
           lg:px-[100px]
   
           prose prose-2xl prose-headings:text-[4.6vw] prose-h2:text-[5.4vw] prose-h1:text-[6.8vw] prose-headings:text-[#ffffff]  prose-p:text-[4.3vw] prose-p:text-[#cccccc] prose-p:font-medium prose-li:text-[4.3vw] prose-li:text-[#ffffff] marker:text-[#ffffff] prose-li:font-bold prose-ol:text-[3vw] [&_ol]:pl-1 [&_ul]:pl-4

          md:prose-headings:text-[3.6vw]  md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[2vw]md:prose-li:text-[2vw] md:prose-ol:text-[2vw]
                
          lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[1.6vw] lg:prose-h1:text-[2vw] lg:prose-p:text-[1.2vw] lg:prose-li:text-[1.2vw] lg:prose-ol:text-[1.2vw]
         "
      >
        <h1 className="leading-9 md:leading-12 lg:leading-11">
          Layanan Fleksibel dan Siap Pakai untuk Siapa Saja yang Butuh Konten
          Keren
        </h1>
        <p className="text-justify">
          Layanan satuan, fleksibel, dan siap pakai — untuk kebutuhan visual dan
          konten digitalmu. Buat kamu yang butuh jasa cepat, hasil maksimal,
          tanpa ribet — kami hadir dengan berbagai layanan satuan yang bisa kamu
          pilih sesuai kebutuhan. Cocok untuk content creator, freelancer,
          hingga organisasi yang butuh support kreatif.
        </p>
        <ol className="list-decimal list-inside">
          <li>
            Desain Grafis
            <p className="text-justify">
              Bikin visual kamu tampil menarik dan jelas.Kami bantu desain untuk
              kebutuhan apapun, dari tugas sekolah, acara organisasi, sampai
              desain buat sosial media pribadi.
            </p>
            <ul className="list-disc list-inside">
              Contoh layanan:
              <li>Poster acara / seminar / lomba</li>
              <li>Slide presentasi</li>
              <li>Desain feed & story Instagram</li>
              <li>Sertifikat, ID card, brosur, dan lainnya</li>
            </ul>
          </li>

          <li>
            Editing Video
            <p className="text-justify">
              Video kamu masih mentah atau biasa aja? Kami bantu editin biar
              tampil lebih clean, menarik, dan siap upload ke media sosial atau
              dipakai presentasi.
            </p>
            <ul className="list-disc list-inside">
              Contoh layanan:
              <li>Editing reels / TikTok</li>
              <li>Video tugas / dokumentasi kegiatan</li>
            </ul>
          </li>

          <li>
            Caption & Penulisan Konten
            <p className="text-justify">
              Bingung nulis caption? Mau bikin naskah tapi stuck di ide? Tenang,
              kami bisa bantu merangkai kata yang menarik, rapi, dan sesuai
              kebutuhan kamu.
            </p>
            <ul className="list-disc list-inside">
              Contoh layanan:
              <li>Caption Instagram.</li>
              <li>Teks promosi acara / lomba.</li>
              <li>Naskah video pendek.</li>
            </ul>
          </li>
        </ol>

        <h2
          className="
           leading-6 md:leading-10
           "
        >
          Fleksibel & Terjangkau, Siap Bantu Kapan Aja!
        </h2>
        <p className="text-justify">
          Semua layanan ini bisa kamu ambil satuan, sesuai kebutuhan dan budget
          kamu. Cocok buat kamu yang pengen hasil keren tanpa harus ribet atau
          mahal. <br />
          <br />
          Ceritain aja dulu kamu butuh bantuan apa. Kami siap bantu dari hal
          kecil sampai yang kelihatan simpel tapi penting banget.
        </p>

        <p>
          <i>
            Diskusikan Project kamu sekarang juga bersama tim profesional kami
          </i>
        </p>

        <Button name="Diskusikan Project" href="/diskusi-project" />
      </main>
      <Footer />
    </>
  );
}
