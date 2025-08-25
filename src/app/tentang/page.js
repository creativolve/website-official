import { BackButton } from "@/components/atoms/button/button";
import ColTextImage, {
  ColImageText,
} from "@/components/molecules/column/column";
import Footer from "@/components/organism/footer/footer";
import HeroTentangPage from "@/components/organism/page_tentang/hero/heroTentang";


export default function TentangPage() {
  return (
    <>
    <BackButton/>
      <HeroTentangPage />
      <main
        className="
        z-[10] 
      px-10
      md:px-30
      lg:px-30
      "
      >
        {/* DESKRIPSI */}
        <section
          id="deskripsi"
          className=" z-[10] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
        >
          <ColTextImage
            ShinyTextValue="Menyediakan berbagai layanan solusi digital kreatif dan strategi branding bisnis!"
            ParagraphValue="Di dunia digital, kebutuhan solusi digital semakin penting dan kami menyediakannya untuk Anda"
            SrcImg="/image/Deskripsi Section.jpg"
            AltImg="Deskripsi Creativolve"
          />
        </section>

        {/* VISI */}
        <section
          id="visi"
          className=" z-[10] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
        >
          <ColImageText
            ShinyTextValue="Visi & Misi Kami: Menjadi Pusat Solusi Digital"
            ParagraphValue="Kami hadir dengan visi dan misi untuk menjadi pusat solusi digital yang inovatif, terpercaya, dan fleksibel. Dengan layanan yang dapat disesuaikan, kami berkomitmen mendukung berbagai kalangan dalam menghadapi tantangan dunia digital, serta membantu mewujudkan ide dan tujuan melalui solusi yang tepat."
            SrcImg="/image/Visi Section.jpg"
            AltImg="Visi Creativolve"
          />
        </section>

        {/* Skema Harga Section */}
        <section
          id="skema-plan"
          className=" z-[10] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
        >
          <ColTextImage
            ShinyTextValue="Pilihan Skema Harga yang Fleksibel dan Bisa Disesuaikan"
            ParagraphValue="Kami memahami bahwa setiap bisnis memiliki kebutuhan dan anggaran yang berbeda. Karena itu, kami menyediakan pilihan skema harga yang fleksibel dengan budget yang dapat disesuaikan. Dengan layanan yang bisa dikostumisasi, Anda dapat memilih solusi digital terbaik sesuai prioritas dan tujuan bisnis Anda."
            SrcImg="/image/SkemaSection.jpg"
            AltImg="Skema Harga Creativolve"
          />
        </section>

        {/* Izin Resmi Section */}
        <section
          id="resmi"
          className=" z-[10] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
        >
          <ColImageText
            ShinyTextValue="Agensi Resmi dengan Izin Legal yang Terpercaya"
            ParagraphValue="Kami adalah agensi yang telah memiliki izin resmi dan legalitas yang sah, sehingga setiap layanan yang kami berikan dapat dipercaya dan terjamin keamanannya. Dengan dasar legal yang kuat, kami berkomitmen untuk mendukung berbagai kalangan melalui solusi digital yang inovatif, profesional, dan sesuai kebutuhan."
            SrcImg="/image/resmi Section.jpg"
            AltImg="Izin Resmi Creativolve"
          />
        </section>
      </main>

      {/* FOOTER */}
      <div
        className="
      px-10
      md:px-30
      lg:px-30
      "
      >
        <Footer />
      </div>
    </>
  );
}
