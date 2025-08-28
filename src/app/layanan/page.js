import FadeIn from "@/components/atoms/animation/fadein";
import GradientButton, { BackButton } from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import ColTextImage, {
  ColImageText,
} from "@/components/molecules/column/column";
import Footer from "@/components/organism/footer/footer";
import HeroLayananPage from "@/components/organism/layanan_page/hero/hero";

export default function LayananPage() {
  return (
    <>
      <BackButton />
      <HeroLayananPage />
      <main
        className="
        z-[10] 
      px-10
      md:px-30
      lg:px-30
      "
      >
        {/* DIGITAL BRANDING */}
        <ColTextImage
          IdSection="digital-branding"
          SrcImg="/image/layanan/digital-branding.jpg"
          AltImg="Digital Branding - Creativolve Agency"
        >
          <FadeIn>
            <H2>Kuatkan Identitas Brand Anda</H2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami membangun identitas digital yang konsisten, autentik, dan
              relevan agar brand mudah dikenali audiens.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <GradientButton>Lihat Skema Harga!</GradientButton>
          </FadeIn>
        </ColTextImage>

        {/* DESAIN GRAFIS */}
        <ColImageText
          IdSection="desain-grafis"
          SrcImg="/image/layanan/desain-grafis.jpg"
          AltImg="Desain Grafis - Creativolve Agency"
        >
          <FadeIn>
            <H2>Visual yang Kuat dan Menarik</H2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami menghadirkan desain grafis profesional yang memperkuat
              identitas brand serta menarik perhatian audiens.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <GradientButton>Lihat Skema Harga!</GradientButton>
          </FadeIn>
        </ColImageText>

        {/* Editing Video */}
        <ColTextImage
          IdSection="editing-video"
          SrcImg="/image/layanan/digital-branding.jpg"
          AltImg="Digital Branding - Creativolve Agency"
        >
          <FadeIn>
            <H2>Video Kreatif dan Profesional</H2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami membangun identitas digital yang konsisten, autentik, dan
              relevan agar brand mudah dikenali audiens.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <GradientButton>Lihat Skema Harga!</GradientButton>
          </FadeIn>
        </ColTextImage>

        {/* WEB DEVELOPMENT */}
                <ColImageText
          IdSection="web-development"
          SrcImg="/image/layanan/developer.jpg"
          AltImg="Web Development - Creativolve Agency"
        >
          <FadeIn>
            <H2>Website Modern dan Fungsional</H2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami membangun website responsif, profesional, dan user-friendly untuk mendukung pertumbuhan serta kredibilitas bisnis Anda.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <GradientButton>Lihat Skema Harga!</GradientButton>
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
