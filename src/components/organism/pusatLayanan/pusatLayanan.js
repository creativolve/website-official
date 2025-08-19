import FadeIn from "@/components/atoms/animation/fadein";
import Orb from "@/components/atoms/animation/orbBackground";
import GradientButton, { ShinyButton } from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";

export default function PusatLaySection() {
  return (
    <section
      id="pusat-layanan"
      className="relative h-[100vh] flex justify-center items-center lg:h-[110vh]"
    >
      <div className="w-full h-[800px] lg:h-[700px] absolute z-[0] opacity-40 lg:opacity-100">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      <div className="text flex flex-col justify-center space-y-6 items-center relative w-[full] lg:w-1/2 z-[999]">
        <FadeIn delay={0.4}>
          <ShinyButton>Creativolve Operations & Response Assistant</ShinyButton>
        </FadeIn>
        <FadeIn>
          <H2 align="center" className="">
            Layanan Digital Creative Dengan Efektiftas Dan Efisiensi
          </H2>
        </FadeIn>
        <FadeIn delay={0.4}>
          <GradientButton href='/pusat-layanan'>Ke Pusat Layanan!</GradientButton>
        </FadeIn>
      </div>
    </section>
  );
}
