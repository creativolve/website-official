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
      className="relative h-screen w-full flex px-10 justify-center items-center"
    >
      <div className="opacity-[0.8] w-full top-0 h-full absolute">
        <Beams
          beamWidth={2.6}
          beamHeight={30}
          beamNumber={20}
          lightColor="#318aff"
          speed={5}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={-60}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1/3 
  bg-gradient-to-t 
  from-black/70 via-black/20 to-transparent pointer-events-none"
        />
      </div>
      <div
        className="
            lg:w-[50%] inset-0 justify-center items-center flex flex-col gap-4
            "
      >
        <div className="w-auto">
          <FadeIn delay={0.5}>
            <ShinyButton>Pusat Layanan Agensi</ShinyButton>
          </FadeIn>
        </div>
        <H1 align="center">
          <BlurText className="text-center">
            Evolusi Pusat Layanan
            Era Digital Dan Teknologi
          </BlurText>
        </H1>
        <FadeIn delay={0.3}>
          <Paragraph align="center">
            Creativolve terus mengembangkan penerepan AI Agent pada operasional
            agensi, guna memberikan pelayanan yang efektif dan juga efisien!.
          </Paragraph>
        </FadeIn>
      </div>
    </section>
  );
}
