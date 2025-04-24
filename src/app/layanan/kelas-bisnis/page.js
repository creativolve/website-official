"use client"

import BreadcrumbNav from "@/components/breadCrumbs-layanan";
import Footer from "@/components/footer";
import Button from '@/components/button';

import '@/css/typografi.css'


export default function LayananUmum(){

  return (
    <>
      <BreadcrumbNav index={0}/>
      <main
      className="
        py-[6vw] text-left w-[100%] m-auto px-[20px] pb-60
        lg:px-[100px] 

        prose prose-2xl prose-headings:text-[4.6vw] prose-h2:text-[5.4vw] prose-h1:text-[6.8vw] prose-headings:text-[#ffffff]  prose-p:text-[4.3vw] prose-p:text-[#cccccc] prose-p:font-medium prose-li:text-[4.3vw] prose-li:text-[#ffffff] marker:text-[#ffffff] prose-li:font-bold prose-ol:text-[3vw] [&_ol]:pl-1 [&_ul]:pl-4

        md:prose-headings:text-[3.6vw]  md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[2vw]md:prose-li:text-[2vw] md:prose-ol:text-[2vw]
              
        lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[1.6vw] lg:prose-h1:text-[2vw] lg:prose-p:text-[1.2vw] lg:prose-li:text-[1.2vw] lg:prose-ol:text-[1.2vw]
      ">
        <h1 className="leading-9 md:leading-12 lg:leading-11">
        Mulai Langkah Baru, Kembangkan Bisnismu dengan Fleksibilitas yang Siap Mendukung Setiap Kebutuhanmu!  
        </h1>
        <p className='text-justify'>
        Kami memahami bahwa setiap bisnis punya kebutuhan, tantangan, dan potensi yang berbeda.
        Itulah sebabnya kami hadir dengan pendekatan yang fleksibel dan personal, siap mendukung pertumbuhan bisnismu sejak awal hingga berkembang pesat di dunia digital.
        </p>
        <ol className="list-decimal list-inside">
          <li>
          Fleksibelitas Sesuai Kebutuhan
            <p className='text-justify'>
            Kami tidak menawarkan solusi yang kaku. Setiap layanan kami bisa disesuaikan berdasarkan kebutuhan, tujuan, dan budget yang kamu miliki.
            </p>
            <p className='text-justify'>
            Punya anggaran terbatas tapi tetap ingin hasil maksimal? Kami bantu dengan strategi yang efisien, terarah, dan bertahap. Dengan sistem budget based customization, kamu tetap bisa mendapatkan layanan profesional tanpa harus memaksakan anggaran.
            </p>
          </li>

          <li>
          Layanan Konsultasi yang Intensif
            <p className='text-justify'>
            Kami tidak hanya memberikan jasa, tapi juga menjadi partner yang benar-benar terlibat. Setiap klien mendapatkan sesi konsultasi yang intens dan terarah, mulai dari perencanaan strategi, evaluasi brand, hingga pengembangan ide.
            </p>
            <ul className="list-disc list-inside">
              Kami hadir dengan:
              <li>Sesi diskusi terbuka & penuh insight.</li>
              <li>Rekomendasi berbasis riset dan tren pasar.</li>
              <li>Pendekatan kolaboratif yang melibatkan kamu di setiap langkah.</li>
            </ul>
          </li>

          <li>
          Dukungan Penuh untuk Membangun Brand Digital yang Kuat
            <p className='text-justify'>
            Di tengah arus cepat perkembangan dunia digital, kamu butuh pendamping yang bisa diandalkan. Kami bantu kamu membangun identitas brand yang kuat, relevan, dan berdaya saing — dari strategi hingga eksekusi.
            </p>
            <ul className="list-disc list-inside">
            Apa yang kami dukung:
            <li>Branding dan storytelling digital.</li>
            <li>Optimasi media sosial dan konten.</li>
            <li>Strategi marketing yang terarah dan terukur.</li>
            <li>Konsistensi visual dan suara brand di semua channel.</li>
            </ul>
          </li>
        </ol>

        <h2
        className="
        leading-6 md:leading-10
        ">
          Saatnya Membawa Bisnismu ke Level Selanjutnya
        </h2>
        <p className='text-justify'>
        Sudah waktunya bisnismu tumbuh, berkembang, dan dikenal lebih luas. <br /><br />
        Ini waktunya untuk mulai, berkembang, dan dikenal lebih luas. Dengan fleksibilitas dalam layanan, strategi yang sesuai dengan anggaranmu, serta pendampingan intens dari tim kami — kamu tidak lagi sendiri dalam membangun brand. Kami hadir bukan hanya untuk mengeksekusi, tapi juga mendampingi, merancang, dan tumbuh bersama kamu.
        </p>

        <p>
          <i>Diskusikan Project kamu sekarang juga bersama tim profesional kami</i>
        </p>

        <Button name='Diskusikan Project' href='/diskusi-project'/>

      </main>
      <Footer/>
    </>
  )
}