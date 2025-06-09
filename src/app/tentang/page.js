import Footer from "@/components/footer";
import "@/css/typografi.css";
import Image from "next/image";
import "@/css/effect.css"
import BackButton from "@/components/backButton";

export default function TentangPage() {
  const misiList = [
    {
      misi: "Memberikan pelayanan digital dengan pemanfaatan automation secara profesional dan inovatif.",
    },
    {
      misi: "Membantu bisnis berkembang dengan solusi branding dan digital yang efektif.",
    },
    {
      misi: "Mengeksplorasi dan mengangkat keunikan sebuah brand untuk membentuk identitas visual yang menarik serta bermakna dan autentik.",
    },
    {
      misi: "Mewujudkan komunitas bisnis berbasis digital branding yang mendukung pertumbuhan bisnis melalui strategi inovatif dan kolaboratif.",
    },
    {
      misi: "Mendorong adopsi teknologi dalam strategi pemasaran dan branding.",
    },
    {
      misi: "Membangun platform digital yang mendukung pertumbuhan bisnis secara berkelanjutan.",
    },
    {
      misi: "Memberikan edukasi digital branding serta strategi bisnis modern.",
    },
  ];

  return (
    <div>
        <BackButton/>
      <Image
        src="/images/tentangPage/circle.png"
        alt="bg"
        width={500}
        priority
        height={500}
        className="
        w-[200vw] absolute z-[0] top-[0px] pointer-events-none select-none
        lg:w-[63%] lg:left-52
        "
      />
         
      <header
        className="
        h-[50vh] flex justify-center items-center 
        lg:h-[100vh]
        "
      >
        <h1
          className="
            font-bold text-[8vw] leading-[9vw] text-center text-[#ffffff] z-1 mt-[100px]
            md:text-[7vw] md:leading-[7.1vw]
            lg:text-[3.3vw] lg:leading-[3.7vw]  lg:mt-[200px]
            "
        >
            <span
            className="text-gradient">
                Creativolve Agency <br />
            </span>
          Solusi Digital Kreatif
        </h1>
      </header>
      <main
        className="
        m-auto pb-40 px-[50px]
        md:px-[15vw]
        lg:px-0

        prose prose-xl prose-headings:text-[4.6vw] prose-h2:text-[5.4vw] prose-h1:text-[6.8vw] prose-headings:text-[#ffffff]  prose-p:text-[4.3vw] prose-p:text-[#cccccc] prose-p:font-medium prose-li:text-[4.3vw] prose-li:text-[#ffffff]  prose-li:font-bold prose-ol:text-[3vw] [&_ol]:pl-1 [&_ul]:pl-4

        md:prose-headings:text-[3.6vw]  md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[2vw]md:prose-li:text-[2vw] md:prose-ol:text-[2vw]
              
        lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[1.6vw] lg:prose-h1:text-[2vw] lg:prose-p:text-[1.2vw] lg:prose-li:text-[1.2vw] lg:prose-ol:text-[1.2vw]
        "
      >
        <h1 className="text-gradient">Tentang Creativolve Agency</h1>
        <p
          className="
            text-justify
            "
        >
          Creativolve Agency adalah sebuah{" "}
          <i> marketing and branding agency </i>yang hadir sebagai solusi
          inovatif untuk menjawab kebutuhan digital branding dan strategi bisnis
          masa kini. Dengan menjadikan Digital Branding dan Strategy Branding
          sebagai role model utama, kami berkomitmen untuk menjadi mitra
          strategis yang mendorong evolusi dan pertumbuhan bisnis melalui
          pendekatan kreatif, kolaboratif, dan berbasis teknologi digital.
        </p>
        <p
          className="
            text-justify
            "
        >
          Kami percaya bahwa setiap bisnis, terlepas dari besar atau kecilnya,
          memiliki potensi besar untuk tumbuh. Oleh karena itu, kami
          menghadirkan pendekatan unik yang kami sebut sebagai
          <i className="text-white">Budget-Based Customization</i>—di mana kami
          menyesuaikan strategi dan performa layanan kami berdasarkan anggaran
          yang dimiliki klien, tanpa mengurangi kualitas dan profesionalitas.
          Dengan sistem ini, klien tak perlu khawatir soal biaya karena kami
          akan merancang solusi yang optimal sesuai kemampuan mereka.
        </p>

        <div
          className="
            bg-[#21252C] px-5 py-8 rounded-xl my-20 shadow-lg shadow-500/50
            "
        >
          <h2 className="text-gradient">Visi Dan Misi Kami!</h2>
          <p className="text-[#c2c2c2] text-justify lg:text-left">
            <strong className="text-white">Visi :</strong>
            <br /> Menjadi pusat solusi bisnis inovatif yang berpusat pada
            kreatif digital untuk mendorong evolusi dan pertumbuhan bisnis.
          </p>

          <ol className="list-decimal list-inside text-[#c2c2c2] marker:text-white">
          <p><strong className="text-white">Misi :</strong></p>
            {misiList.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.misi}</span>
              </li>
            ))}
          </ol>
        </div>

        <h2 className="text-gradient">Layanan Kami</h2>
        <p className="text-justify">
          Sebagai agensi dengan pendekatan menyeluruh, layanan kami dirancang
          dalam empat cakupan utama:
        </p>
        <ul>
          <li>
            Digital Branding dan Strategy (Role Model Utama)
            <p className="text-justify">
              Membentuk identitas brand yang kuat, otentik, dan relevan untuk
              pasar digital.
            </p>
          </li>
          <li>
            Digital Marketing
            <p className="text-justify">
              Menjangkau audiens yang tepat dengan strategi kampanye digital
              yang terukur.
            </p>
          </li>
          <li>
            Desain dan Editing
            <p className="text-justify">
              Layanan desain visual dan editing konten yang tersedia juga secara
              satuan untuk kebutuhan umum.
            </p>
          </li>
          <li>
            Pengembangan Website
            <p className="text-justify">
              Membangun situs web profesional yang responsif, cepat, dan
              fungsional, serta mencerminkan identitas brand secara optimal.
            </p>
          </li>
          <li>
            Search Engine Optimization (SEO)
            <p className="text-justify">
              Mengoptimalkan visibilitas website di mesin pencari untuk
              meningkatkan traffic organik dan memperkuat kehadiran digital
              secara berkelanjutan.
            </p>
          </li>
        </ul>

        <p className="text-justify">
          Melalui pendekatan kolaboratif, inovatif, dan berfokus pada solusi
          yang terjangkau namun berdampak, Creativolve Agency hadir bukan
          sekadar sebagai penyedia jasa, tapi sebagai mitra pertumbuhan jangka
          panjang bagi bisnis Anda.
        </p>

        <h2 className="text-gradient">
          Legalitas Usaha
        </h2>
        <p>
        Creativolve Agency telah memiliki legalitas resmi sebagai pelaku usaha di Indonesia namun nama dalam legalitas usaha ini masih nama pemilik karena belum berbadan PT/CV. Kami terdaftar dalam sistem OSS (Online Single Submission) dengan detail sebagai berikut:
        </p>
        <ol className="list-decimal list-inside text-[#c2c2c2] marker:text-white leading-6">
          <li className="flex flex-col">
            <strong className="text-white">Nomor Induk Berusaha (NIB):</strong> <p>0705250010647</p>
          </li>
          <li className="flex flex-col">
           <strong className="text-white">KBLI:</strong>
           <p>74130 – Aktivitas Desain Komunikasi Visual / Desain Grafis / Multimedia</p>
          </li>
          <li className="flex flex-col">
            <strong className="text-white">Tanggal Terbit:</strong>
            <p>Jakarta, 7 Mei 2025</p>
          </li>
          <li className="flex flex-col">
            <strong className="text-white">Skala Usaha:</strong>
            <p>Mikro (PMDN – Penanaman Modal Dalam Negeri)</p>
          </li>
          <li className="flex flex-col">
            <strong className="text-white">Atas Nama:</strong>
            <p> M. Adnan Fauzan Maulana (Founder)</p>
          </li>
        </ol>
        <p>
        Legalitas ini menegaskan bahwa Creativolve beroperasi secara sah dan profesional di bawah payung hukum yang berlaku di Indonesia.
        </p>

        <h3>
          Operasional
        </h3>
        <p>
        Creativolve Agency adalah agensi digital yang beroperasi secara full remote, dengan tim profesional yang tersebar di berbagai lokasi. Model kerja ini memungkinkan kami untuk menghadirkan fleksibilitas, efisiensi, dan kolaborasi tanpa batas, guna memberikan solusi branding dan digital marketing yang inovatif dan berdampak.
        </p>
        <p>
        Meskipun bekerja tanpa batasan geografis, kami tetap berakar dan bertumbuh di kota Bogor tempat di mana visi, nilai, dan semangat kami dibentuk. Dari Bogor, kami membangun fondasi untuk menjadi pusat solusi digital yang mendorong evolusi bisnis secara berkelanjutan, baik lokal maupun global.
        </p>
        <p>
        Seluruh operasional Creativolve Agency dilakukan secara digital melalui platform sosial resmi serta saluran komunikasi yang terintegrasi, seperti website, layanan chat, dan fitur FAQ yang tersedia. Kami memanfaatkan teknologi ini untuk memberikan pelayanan yang cepat, transparan, dan mudah diakses oleh klien kapan saja dan di mana saja. 
        </p>
        <p>
        Selain itu, kami sedang merencanakan pengembangan sistem pembayaran online yang terintegrasi langsung melalui website. Sistem ini akan menghubungkan proses pembayaran dengan akses eksklusif ke informasi dan progress project, yang hanya dapat diakses oleh klien melalui client key khusus. Dengan demikian, klien mendapatkan transparansi penuh sekaligus keamanan data proyek yang mereka percayakan kepada kami.
        </p>
        <br />
        <br />
        <br />
        <p>
          <strong className="text-white"><i>
                          Semua kanal media sosial resmi Creativolve Agency hanya yang tercantum dan dapat diakses melalui website ini. Kami tidak memiliki akun resmi di platform lain di luar yang terdaftar, sehingga untuk informasi dan komunikasi yang terpercaya, mohon pastikan Anda mengakses melalui saluran resmi kami di website ini.
          </i></strong>

        </p>
      </main>
      <div
      className="
        px-[40px]
        md:px-[100px]
        lg:px-[150px] lg:py-[20px]">
        <Footer />
      </div>
    </div>
  );
}