import FadeIn from "@/components/atoms/animation/fadein";
import { BackButton } from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import ColTextImage, {
  ColImageText,
} from "@/components/molecules/column/column";
import Footer from "@/components/organism/footer/footer";
import HeroTentangPage from "@/components/organism/page_tentang/hero/heroTentang";

export default function TentangPage() {
  return (
    <>
      <BackButton />
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
          <ColTextImage
          IdSection="deskripsi"
            SrcImg="/image/Deskripsi Section.jpg"
            AltImg="Apa itu Creativolve Agency"
          >
            <FadeIn>
              <H2>
                Menyediakan berbagai layanan solusi digital kreatif dan strategi
                branding bisnis!
              </H2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Paragraph>
                Di dunia digital, kebutuhan solusi digital semakin penting dan
                kami menyediakannya untuk Anda
              </Paragraph>
            </FadeIn>
          </ColTextImage>

        {/* VISI */}
          <ColImageText
          IdSection="visi"
            SrcImg="/image/Visi Section.jpg"
            AltImg="Visi Creativolve Agency"
          >
            <FadeIn>
              <H2>Visi & Misi Kami: Menjadi Solusi Digital Yang Berdampak</H2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Paragraph>
                Kami hadir dengan visi dan misi untuk menjadi pusat solusi
                digital yang inovatif, terpercaya, dan fleksibel. Dengan layanan
                yang dapat disesuaikan, kami berkomitmen mendukung berbagai
                kalangan dalam menghadapi tantangan dunia digital, serta
                membantu mewujudkan ide dan tujuan melalui solusi yang tepat.
              </Paragraph>
            </FadeIn>
          </ColImageText>

        {/* Skema Harga Section */}
          <ColTextImage
          IdSection="skema-plan"
            SrcImg="/image/SkemaSection.jpg"
            AltImg="Konsep Skema Harga Creativolve Agency"
          >
            <FadeIn>
              <H2>Pilihan Skema Harga yang Fleksibel dan Bisa Disesuaikan.</H2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Paragraph>
                Kami memahami bahwa setiap bisnis memiliki kebutuhan dan
                anggaran yang berbeda. Karena itu, kami menyediakan pilihan
                skema harga yang fleksibel dengan budget yang dapat disesuaikan.
                Dengan layanan yang bisa dikostumisasi, Anda dapat memilih
                solusi digital terbaik sesuai prioritas dan tujuan bisnis Anda.
              </Paragraph>
            </FadeIn>
          </ColTextImage>

        {/* Izin Resmi Section */}
          <ColImageText
          IdSection="resmi"
            SrcImg="/image/resmi Section.jpg"
            AltImg="Izin Resmi Creativolve Agency"
          >
            <FadeIn>
              <H2>Agensi Resmi Berjalan dengan Izin Legal yang Terpercaya</H2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Paragraph>
                Kami adalah agensi yang telah memiliki izin resmi dan legalitas
                yang sah, sehingga setiap layanan yang kami berikan dapat
                dipercaya dan terjamin keamanannya. Dengan dasar legal yang
                kuat, kami berkomitmen untuk mendukung berbagai kalangan melalui
                solusi digital yang inovatif, profesional, dan sesuai kebutuhan.
              </Paragraph>
            </FadeIn>
          </ColImageText>
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
