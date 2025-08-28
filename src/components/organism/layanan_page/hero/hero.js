import Beams from "@/components/atoms/animation/beamsBg";
import BlurText from "@/components/atoms/animation/blurText";
import FadeIn from "@/components/atoms/animation/fadein";
import { ShinyButton } from "@/components/atoms/button/button";
import H1 from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";

export default function HeroLayananPage() {
  return (
    <section
      id="deskripsi"
      className="relative h-screen w-full flex justify-center items-center"
    >
      <div className="opacity-[0.8] w-full top-0 h-full absolute">
        <Beams
          beamWidth={2.6}
          beamHeight={30}
          beamNumber={20}
          lightColor="#318aff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={180}
        />
      </div>
      <div
        className="
            lg:w-[50%] inset-0 justify-center items-center flex flex-col gap-4
            "
      >
        <div className="w-auto">
          <FadeIn delay={0.5}>
            <ShinyButton>Creativolve Agency</ShinyButton>
          </FadeIn>
        </div>
        <H1>
          <BlurText
            className="font-bold text-5xl
                  lg:text-5xl  text-center"
          >
            Layanan Fleksibel Dengan Sistem Penyesuaian Sesuai Budget.
          </BlurText>
        </H1>
        <FadeIn delay={0.3}>
          <Paragraph align="center">
            Creativolve Agency memberikan layanan yang bisa dikustomisasi
            berdasarkan budget, sehingga klien tetap mendapat hasil terbaik
            tanpa harus keluar dari kemampuan finansialnya.
          </Paragraph>
        </FadeIn>
      </div>
    </section>
  );
}
