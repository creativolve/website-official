import FadeIn from "@/components/atoms/animation/fadein";
import SpotlightCard from "@/components/atoms/animation/spootlight";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import Image from "next/image";
import { Children } from "react";

export default function ColTextImage({ IdSection, children, SrcImg, AltImg }) {
  return (
    <>
      <section
        id={IdSection}
        className=" z-[10] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
      >
        <div className="container mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* TEXT */}
            <div className="w-full lg:w-1/2 max-w-md lg:max-w-none space-y-4">
              {children}
            </div>

            {/* IMAGE */}
            <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
              <FadeIn delay={0.6}>
                <SpotlightCard className="w-full aspect-square">
                  <div className="relative w-full h-full">
                    <Image
                      src={SrcImg}
                      alt={AltImg}
                      loading="lazy"
                      fill
                      quality={90}
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </SpotlightCard>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ColImageText({IdSection, children, SrcImg, AltImg }) {
  return (
    <>
      <section
        id={IdSection}
        className=" z-[10] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* IMAGE */}
            <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
              <FadeIn delay={0.6}>
                <SpotlightCard className="w-full aspect-square">
                  <div className="relative w-full h-full">
                    <Image
                      src={SrcImg}
                      alt={AltImg}
                      loading="lazy"
                      fill
                      quality={90}
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </SpotlightCard>
              </FadeIn>
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-1/2 max-w-md lg:max-w-none space-y-4">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
