import dynamic from "next/dynamic";
import BlurText from "@/components/atoms/animation/blurText";
import FadeIn from "@/components/atoms/animation/fadein";
import { ShinyButton } from "@/components/atoms/button/button";
import H1 from "@/components/atoms/heading/heading";
import Beams from "@/components/atoms/animation/beamsBg";

export default function HeroTentangPage() {
  return (
    <section
      id="deskripsi"
      className="relative h-screen w-full flex justify-center items-center"
    >
      <div className="opacity-[0.8] top-0 w-full h-[700px] absolute">
  <Beams
    beamWidth={2.6}
    beamHeight={30}
    beamNumber={20}
    lightColor="#318aff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={30}
  />
  <div className="absolute bottom-0 left-0 w-full h-1/3 
  bg-gradient-to-t 
  from-black/70 via-black/20 to-transparent pointer-events-none" 
/>
      </div>
      <div
        className="
            lg:w-[50%] inset-0 justify-center  px-10 items-center flex flex-col gap-4
            "
      >
        <div className="w-auto">
          <FadeIn delay={0.5}>
            <ShinyButton>Creativolve Agency</ShinyButton>
          </FadeIn>
        </div>
        <H1>
          <BlurText>
            Agensi Solusi Digital Dan Strategi Branding
          </BlurText>
        </H1>
      </div>
    </section>
  );
}
