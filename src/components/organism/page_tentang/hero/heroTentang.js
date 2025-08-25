import BlurText from "@/components/atoms/animation/blurText";
import FadeIn from "@/components/atoms/animation/fadein";
import Threads from "@/components/atoms/animation/threadsBg";
import { ShinyButton } from "@/components/atoms/button/button";
import H1 from "@/components/atoms/heading/heading";

export default function HeroTentangPage() {
  return (
    <section
      id="deskripsi"
      className="relative h-screen w-full flex justify-center items-center"
    >
      <div className="opacity-[0.8] w-full h-[600px] absolute">
        <Threads amplitude={1} distance={0.7} enableMouseInteraction={false} />
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
            Agensi Solusi Digital Dan Strategi Branding
          </BlurText>
        </H1>
      </div>
    </section>
  );
}
