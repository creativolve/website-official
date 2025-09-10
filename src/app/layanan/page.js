import FadeIn from "@/components/atoms/animation/fadein";
import GradientButton, { BackButton } from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import ColTextImage, {
  ColImageText,
} from "@/components/molecules/column/column";
import Footer from "@/components/organism/footer/footer";
import HeroLayananPage from "@/components/organism/layanan_page/hero/hero";
import LayananOverlay from "@/components/organism/overlay/overlay";
import { getServicesWithBlocks } from "@/lib/notion";

export default async function LayananPage() {
  const services = await getServicesWithBlocks(); // Ambil services dengan blocks
  console.log("🔥 Services dari Notion:", services);

  const branding = services.find((s) => s.category?.toLowerCase() === "digital branding");
  const desain   = services.find((s) => s.category?.toLowerCase() === "desain grafis");
  const video    = services.find((s) => s.category?.toLowerCase() === "editing video");
  const webdev   = services.find((s) => s.category?.toLowerCase() === "web development");

  console.log("👉 Branding:", branding);
  console.log("👉 Desain:", desain);
  console.log("👉 Video:", video);
  console.log("👉 Webdev:", webdev);

  return (
    <>
      <BackButton />
      
      {/* OVERLAY DITEMPATKAN DI BAWAH BACKBUTTON */}
      <LayananOverlay services={services} />
      
      <HeroLayananPage />
      <main className="z-[10] px-10 md:px-30 lg:px-30">

        {/* DIGITAL BRANDING */}
        <ColTextImage IdSection="digital-branding" SrcImg="/image/layanan/digital-branding.jpg" AltImg="Digital Branding">
          <FadeIn>
            <H2>
              Kuatkan Identitas Brand Anda
            </H2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami membangun identitas digital yang konsisten, autentik, dan relevan agar brand mudah dikenali audiens.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <GradientButton data-service="digital branding">
              Lihat Skema Harga!
            </GradientButton>
          </FadeIn>
        </ColTextImage>

        {/* DESAIN GRAFIS */}
        <ColImageText IdSection="desain-grafis" SrcImg="/image/layanan/desain-grafis.jpg" AltImg="Desain Grafis">
          <FadeIn>
            <H2>
              Visual yang Kuat dan Menarik
            </H2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami menghadirkan desain grafis profesional yang memperkuat identitas brand serta menarik perhatian audiens.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <GradientButton data-service="desain grafis">
              Lihat Skema Harga!
            </GradientButton>
          </FadeIn>
        </ColImageText>

        {/* EDITING VIDEO */}
        <ColTextImage IdSection="editing-video" SrcImg="/image/layanan/editor video.jpg" AltImg="Editing Video">
          <FadeIn><H2>Video Kreatif dan Profesional</H2></FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami membangun identitas digital yang konsisten, autentik, dan relevan agar brand mudah dikenali audiens.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <GradientButton data-service="editing video">
              Lihat Skema Harga!
            </GradientButton>
          </FadeIn>
        </ColTextImage>

        {/* WEB DEVELOPMENT */}
        <ColImageText IdSection="web-development" SrcImg="/image/layanan/developer.jpg" AltImg="Web Development">
          <FadeIn>
            <H2>
              Website Modern dan Fungsional
            </H2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Paragraph>
              Kami membangun website responsif, profesional, dan user-friendly untuk mendukung pertumbuhan serta kredibilitas bisnis Anda.
            </Paragraph>
          </FadeIn>
          <FadeIn delay={1}>
            <div data-service="web development">
              <GradientButton>
                Lihat Skema Harga!
              </GradientButton>
            </div>
          </FadeIn>
        </ColImageText>
      </main>
      {/* FOOTER */}
      <div className="px-10 md:px-30 lg:px-30">
        <Footer />
      </div>
    </>
  );
}