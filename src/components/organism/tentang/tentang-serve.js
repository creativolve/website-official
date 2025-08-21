import FadeIn from "@/components/atoms/animation/fadein";
import RotatingText from "@/components/atoms/animation/rotatingText";
import ShinyText from "@/components/atoms/animation/shinnyText";
import SpotlightCard from "@/components/atoms/animation/spootlight";
import GradientButton, { SolidButton } from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import Image from "next/image";

export default function TentangServe() {
  const rotatingTexts = ["Kreatifitas", "Inovasi", "Teknologi", "Digitalisasi"];

  return (
    <section
      id="tentang"
      className=" z-[10] h-[140dvh] lg:h-screen py-12 px-4 mt-[-200px] sm:px-6 lg:mt-[-230px] lg:px-8 flex justify-center items-center"
      aria-labelledby="tentang-heading"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
            <FadeIn>
              <SpotlightCard className="w-full aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src="/image/Tentang Section.jpg"
                    alt="Photo Tentang - Tim kreatif kami"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </SpotlightCard>
            </FadeIn>
          </div>

          {/* Text Content Section */}
          <div className="w-full lg:w-1/2 text-left lg:text-left">
            <FadeIn>
              <ShinyText text="Creativolve Agency" disabled={false} speed={2} />
              <H2
                id="tentang-heading"
                align="left"
                className="mb-6 leading-tight"
              >
                Agensi Kreatif Dengan Dukungan Berbasis{" "}
                <span className="inline-block">
                  <RotatingText
                    texts={rotatingTexts}
                    mainClassName="px-2 sm:px-3 md:px-4 bg-gradient-to-br from-[#318aff] to-[#8dc8ff] text-white overflow-hidden py-0.5 sm:py-1 md:py-1 justify-center rounded-lg shadow-md"
                    staggerFrom="last"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-120%", opacity: 0 }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    elementLevelClassName="inline-block"
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 400,
                    }}
                    rotationInterval={2500}
                    pauseOnHover={true}
                  />
                </span>
              </H2>
            </FadeIn>

            {/* Additional content */}
            <div className="mt-8">
              <FadeIn>
                <Paragraph align="left">
                  Creativolve Agency adalah agensi digital yang menawarkan
                  solusi branding & digital sesuai budget, tanpa mengurangi
                  kualitas strategi.
                </Paragraph>
              </FadeIn>
            </div>
            <div className="mt-5 flex justify-start items-center">
              <FadeIn>
                <GradientButton href='/tentang'>Ketahui Lebih!</GradientButton>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
