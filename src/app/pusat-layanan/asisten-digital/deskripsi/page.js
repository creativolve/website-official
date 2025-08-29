
import { BackButton } from "@/components/atoms/button/button";
import Footer from "@/components/organism/footer/footer";
import "@/app/css/typografi.css";
import Image from "next/image";
import Link from "next/link";

export default async function Tentang() {
  return (
    <>
      <BackButton href="/pusat-layanan" />

      <header className="h-[60vh] flex justify-center items-center w-[80vw] m-auto lg:h-[100vh] lg:w-[60vw]">
        <Image
          src="/og-asistendigital.jpg"
          width={1000}
          height={1000}
          priority
          quality={100}
          alt="Thumbnail"
          className="w-full rounded-2xl object-cover object-left 
          shadow-[0px_0px_20px_#108FFF,0px_0px_20px_#00F6FF] pointer-events-none select-none
          h-[30vh] lg:h-auto"
        />
      </header>

      <main
        className="
          m-auto pb-40 px-[50px]
          md:px-[15vw]
          lg:px-20
           py-[6vw] w-[100%]
  prose prose-2xl 
  prose-p:text-[#cccccc] prose-p:text-justify prose-headings:text-white
  prose-headings:text-[4.6vw] prose-h2:text-[6vw] 
  prose-h1:text-[6.8vw] 
  prose-p:text-[4.5vw]
  prose-li:text-[4.5vw] 
  prose-li:text-[#cccccc]
  prose-li:marker:text-white
  md:prose-headings:text-[3.6vw] md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[3.5vw] md:prose-li:text-[3.5vw]
  lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[2.1vw] lg:prose-h1:text-[3.2vw] lg:prose-p:text-[1.3vw] lg:prose-li:text-[1.3vw]
        "
      >
        <h1>Asisten Digital Creativolve</h1>

        <p>
          Selamat datang di era baru pelayanan digital Creativolve Agency.
          Creativolve dengan bangga menyatakan diri sebagai{" "}
          <strong className="text-white">
            agensi kreatif digital pertama di Bogor
          </strong>{" "}
          menerapkan sistem{" "}
          <strong className="text-white">
            Retrieval-Augmented Generation (RAG)
          </strong>{" "}
          berbasis{" "}
          <strong className="text-white">
            model LLaMA 4 Maverick melalui Groq Cloud
          </strong>{" "}
          dalam bentuk{" "}
          <strong className="text-white">
            Asisten Digital Creativolve 1.0
          </strong>
          , sebuah solusi cerdas yang dirancang untuk memahami dan merespons
          kebutuhan klien secara cepat, empatik, dan relevan.
        </p>

        <p>
          Sistem ini memungkinkan kami menghadirkan layanan pelanggan cerdas dan
          empatik, yang tidak hanya memahami pertanyaan klien tetapi juga
          mengambil data relevan dari basis pengetahuan internal Creativolve
          menghasilkan jawaban yang tepat, kontekstual, dan konsisten dengan
          identitas brand kami.
        </p>

        <p>
          Dengan pendekatan ini, Creativolve tidak hanya memberikan pelayanan
          otomatisasi, tetapi juga membangun interaksi digital yang manusiawi
          dan berbasis solusi nyata, menjadi pelopor dalam era pelayanan
          berbasis AI di Bogor.
        </p>

        <p>Berikut adalah objektif utama dari Asisten Digital Creativolve:</p>

        <ul>
          <li>
            <strong className="text-white">
              Memberikan Solusi yang Relevan:
            </strong>{" "}
            Menangkap inti masalah dari klien dan menawarkan solusi langsung
            dari layanan kami.
          </li>
          <li>
            <strong className="text-white">
              Meningkatkan Pengalaman Pelanggan:
            </strong>{" "}
            Interaksi yang ramah dan empatik seperti diskusi dengan konsultan.
          </li>
          <li>
            <strong className="text-white">
              Menyediakan Informasi yang Akurat:
            </strong>{" "}
            Berdasarkan data layanan internal Creativolve.
          </li>
          <li>
            <strong className="text-white">Meningkatkan Efisiensi:</strong>{" "}
            Jawaban cepat tanpa menunggu support manual.
          </li>
          <li>
            <strong className="text-white">
              Memahami Kebutuhan Secara Personal:
            </strong>{" "}
            Analisis cerdas untuk respons personal.
          </li>
          <li>
            <strong className="text-white">Menjaga Konsistensi Brand:</strong>{" "}
            Fokus hanya pada layanan resmi Creativolve.
          </li>
          <li>
            <strong className="text-white">Meringankan Beban Tim:</strong>{" "}
            Menjawab pertanyaan umum secara otomatis.
          </li>
          <li>
            <strong className="text-white">Mendukung Inovasi:</strong> Langkah
            awal membangun sistem pelayanan AI masa depan.
          </li>
        </ul>

        <p>
          Dengan dukungan teknologi tercanggih, Asisten Digital Creativolve
          menjadi titik temu antara kecanggihan AI dan kepekaan manusia.
          Teknologi yang hebat adalah yang memahami, membantu, dan memberi
          dampak positif.
        </p>

        <p>
          <i>
            Semua model AI yang digunakan melalui Groq Cloud dilisensikan resmi,
            dan data diproses secara internal tanpa dibagikan ke pihak ketiga.
            Ini memastikan keamanan, legalitas, dan etika penggunaan AI untuk
            klien kami.
          </i>
        </p>
      </main>

      <div
        className="
        px-[40px]
        md:px-[100px]
        lg:px-[150px] lg:py-[20px]"
      >
        <Footer />
      </div>
    </>
  );
}