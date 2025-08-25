import BlurText from "@/components/atoms/animation/blurText";
import FadeIn from "@/components/atoms/animation/fadein";
import GradientButton, { SolidButton } from "@/components/atoms/button/button";


import H1 from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex justify-center items-center"
    >
      <div
        className="
            lg:w-[50%] inset-0 flex flex-col gap-4
            "
      >
        <H1>
          <BlurText>
            Dapatkan Solusi Digital Sesuai Budget Kamu!
          </BlurText>
        </H1>
        <FadeIn delay={1}>
          <Paragraph align="center" fontSize="base">
            Tidak perlu khawatir soal biaya besar. Mulai dari desain, branding,
            sampai digital marketing, Creativolve siap jadi partner kreatifmu,
            baik untuk personal, komunitas, maupun usaha.
          </Paragraph>
        </FadeIn>

    <FadeIn delay={1.7}>
        <div className="flex justify-center gap-10">
          <GradientButton href='/'>Ajukan Project</GradientButton>
          <SolidButton href='/'>Pusat Layanan</SolidButton>
        </div>
    </FadeIn>
      </div>
    </section>
  );
}
