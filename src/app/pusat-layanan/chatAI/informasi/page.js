"use client";

import Footer from "@/components/footer";
import "@/css/typografi.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Tentang() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Image
        src="/images/hero/background.png"
        alt="bg"
        width={300}
        priority
        height={300}
        className="
         w-full absolute z-[-30] h-[50vh] top-[-20px] opacity-10 pointer-events-none select-none
         lg:h-[90vh]  lg:opacity-25
         "
      />
      <nav
        className="
         w-fit pt-[60px] px-[50px]
         "
      >
        <div
          className="
             flex gap-5 items-center w-fit
             "
        >
          <Link
            href="/pusat-layanan/chatAI"
            className={`
                 rounded-full px-5 py-2 transition-all duration-200 ease-in-out flex gap-5 text-white justify-center items-center
                 bg-[#262626]
                 
                 hover:shadow-md hover:bg-[#cfcfcf] hover:text-black group
                 active:shadow-md active:bg-[#cfcfcf] active:text-black
 
                 ${scrolled ? "fixed z-[100]" : ""}
                 `}
          >
            Kembali
          </Link>
        </div>
      </nav>
      <header
        className="
         h-[60vh] flex justify-center items-center w-[80vw] m-auto
         lg:h-[100vh] lg:w-[60vw]
         "
      >
        <Image
          src="/images/Pusat-layanan/ChatAi.jpg"
          width={1000}
          height={1000}
          priority
          quality={100}
          alt="Thumbnail"
          className="w-full rounded-2xl object-cover object-left h-[30vh] lg:h-auto"
        />
      </header>
      <main
        className="
         m-auto pb-40 px-[50px]
         md:px-[15vw]
         lg:px-20
 
         prose prose-2xl prose-headings:text-[4.6vw] prose-h2:text-[5.4vw] prose-h1:text-[6.8vw] prose-headings:text-[#ffffff]  prose-p:text-[4.3vw] prose-p:text-[#cccccc] prose-p:font-medium prose-li:text-[4.3vw] prose-li:text-[#ffffff]  prose-li:font-regular prose-ol:text-[3vw] [&_ol]:pl-1 [&_ul]:pl-4
 
         md:prose-headings:text-[3.6vw]  md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[2vw]md:prose-li:text-[2vw] md:prose-ol:text-[2vw]
               
         lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[1.6vw] lg:prose-h1:text-[2vw] lg:prose-p:text-[1.2vw] lg:prose-li:text-[1.2vw] lg:prose-ol:text-[1.2vw]
         "
      >
        <h1>Asisten Digital Creativolve</h1>

        <p>
          Selamat datang di era baru pelayanan digital Creativolve Agency. Creativolve dengan bangga menyatakan diri sebagai {" "} <strong className="text-white">agensi kreatif digital pertama di Bogor</strong>{" "} menerapkan sistem <strong className="text-white"> Retrieval-Augmented Generation {"(RAG)"} </strong> berbasis <strong className="text-white">model LLaMA 4 Maverick melalui Groq Cloud</strong> dalam bentuk {" "} <strong className="text-white">Asisten Digital Creativolve 1.0</strong>
          , sebuah solusi cerdas yang dirancang untuk memahami dan merespons
          kebutuhan klien secara cepat, empatik, dan relevan.
        </p>

        <p>
        Sistem ini memungkinkan kami menghadirkan layanan pelanggan cerdas dan empatik, yang tidak hanya memahami pertanyaan klien tetapi juga mengambil data relevan dari basis pengetahuan internal Creativolve menghasilkan jawaban yang tepat, kontekstual, dan konsisten dengan identitas brand kami.
        </p>

        <p>
        Dengan pendekatan ini, Creativolve tidak hanya memberikan pelayanan otomatisasi, tetapi juga membangun interaksi digital yang manusiawi dan berbasis solusi nyata, menjadi pelopor dalam era pelayanan berbasis AI di Bogor.
        </p>

        <p>Berikut adalah objektif utama dari Asisten Digital Creativolve:</p>

        <ul>
          <li>
            <strong className="text-white">
              Memberikan Solusi yang Relevan:
            </strong>{" "}
            Asisten dirancang untuk menangkap inti masalah dari setiap klien dan
            menawarkan solusi spesifik yang langsung terhubung dengan layanan
            kami, tanpa mengarahkan ke luar ekosistem Creativolve.
          </li>
          <li>
            <strong className="text-white">
              Meningkatkan Pengalaman Pelanggan:
            </strong>{" "}
            Lewat percakapan yang ramah dan empatik, asisten ini menghadirkan
            rasa nyaman dalam berinteraksi—selayaknya berdiskusi dengan
            konsultan profesional.
          </li>
          <li>
            <strong className="text-white">
              Menyediakan Informasi yang Akurat:
            </strong>{" "}
            Dengan akses ke basis data layanan Creativolve, asisten mampu
            memberikan informasi yang cepat, tepat, dan sesuai konteks.
          </li>
          <li>
            <strong className="text-white">Meningkatkan Efisiensi:</strong>{" "}
            Klien dapat memperoleh jawaban atas pertanyaan mereka kapan pun,
            tanpa perlu menunggu balasan manual dari tim support.
          </li>
          <li>
            <strong className="text-white">
              Memahami Kebutuhan Secara Personal:
            </strong>{" "}
            Dengan kemampuan analisis yang canggih, asisten dapat menyesuaikan
            respons sesuai preferensi dan karakteristik masing-masing klien.
          </li>
          <li>
            <strong className="text-white">Menjaga Konsistensi Brand:</strong>{" "}
            Semua jawaban dan solusi difokuskan hanya pada layanan resmi
            Creativolve, menjaga kualitas dan konsistensi pengalaman pengguna.
          </li>
          <li>
            <strong className="text-white">Meringankan Beban Tim:</strong>{" "}
            Dengan menangani pertanyaan umum secara otomatis, tim internal dapat
            lebih fokus pada tugas-tugas yang memerlukan penanganan khusus.
          </li>
          <li>
            <strong className="text-white">Mendukung Inovasi:</strong> Asisten
            ini merupakan langkah awal dalam membangun sistem pelayanan berbasis
            AI yang akan terus berkembang mengikuti visi Creativolve sebagai
            pusat evolusi digital.
          </li>
        </ul>

        <p>
          Dengan dukungan teknologi tercanggih, Asisten Digital Creativolve
          diharapkan menjadi titik temu antara kecanggihan AI dan kepekaan
          manusia. Kami percaya, teknologi yang hebat adalah yang mampu
          memahami, membantu, dan memberi dampak positif. Dan inilah komitmen
          kami untuk Anda.
        </p>
        <p>
          <i>
          Semua model AI yang kami gunakan di Groq Cloud sudah dikelola dan dijalankan dengan lisensi resmi yang telah ditangani oleh Groq, sehingga penggunaannya aman dan legal untuk keperluan komersial. Creativolve tidak meng-host model ini secara mandiri, melainkan mengaksesnya melalui layanan Groq, memastikan bahwa kami mematuhi semua ketentuan dan persyaratan lisensi yang berlaku. Data yang diproses dalam sistem ini sepenuhnya berasal dari informasi internal kami, seperti layanan, portofolio, dan dokumentasi agensi, yang tidak dibagikan ke pihak ketiga. Dengan pendekatan ini, kami menghadirkan solusi AI yang inovatif, transparan, dan etis, tanpa melanggar hak cipta atau batasan lisensi, sehingga dapat memberikan layanan terbaik bagi klien dengan penuh tanggung jawab.
          </i>
        </p>
      </main>
      <Footer />
    </>
  );
}
