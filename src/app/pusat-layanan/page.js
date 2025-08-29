import FadeIn from "@/components/atoms/animation/fadein";
import GradientButton, { BackButton, SolidButton } from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import ColTextImage, {
  ColImageText,
} from "@/components/molecules/column/column";
import HeroLayananPage from "@/components/organism/pusat_page/hero";
import SocialLinks from "@/components/organism/pusat_page/socialLinks";



export default function PusatLayananPage() {
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
        {/* Asiten Digital */}
        <ColImageText
          IdSection="asisten-digital"
          SrcImg="/image/asisten-digital.jpg"
          AltImg="Asisten Digital Creativolve Agency"
        >
          <FadeIn>
            <H2>
              AI Kami bisa menjawab informasi apa yang dibutuhkan oleh anda
              terkait layanan agensi kami!
            </H2>
            </FadeIn>
            <FadeIn>

            <Paragraph>
              Dengan penerapan AI pada sistem Asisten Digital kami, anda sudah
              tidak perlu menunggu lama untuk mendapatkan informasinya,dengan
              seperti ini penyampaian informasi menjadi lebih efektif dan
              efisien.
            </Paragraph>
            </FadeIn>
            <FadeIn className="flex gap-9">

            <GradientButton href='/pusat-layanan/asisten-digital'>Pergi ke chat!</GradientButton>
            <SolidButton href="/pusat-layanan/asisten-digital/deskripsi">
              Deskripsi
            </SolidButton>
            </FadeIn>
        </ColImageText>

        {/* Form Pengajuan */}
        <ColTextImage
          IdSection="form"
          SrcImg="/image/brif-ai.jpg"
          AltImg="Brief AI Creativolve Agency"
        >
          <FadeIn>
            <H2>
              Form Pengajuan Proyek Yang Dilengkapi Bantuan Pembuatan Brief
              Proyek!
            </H2>
            </FadeIn>
            <FadeIn>

            <Paragraph>
              Brief proyek sangat penting dalam sistem layanan jasa, maka dari
              itu kami membuat panduan untuk membuat brief dengan menjawab
              pertanyaan yang ada di dalam form pengajuan kami!
            </Paragraph>
            </FadeIn>
            <FadeIn>

            <GradientButton href="/pusat-layanan/pengajuan">Ajukan Sekarang!</GradientButton>
            </FadeIn>
          
        </ColTextImage>
        <SocialLinks/>
      </main>
    </>
  );
}
