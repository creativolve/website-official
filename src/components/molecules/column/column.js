import FadeIn from "@/components/atoms/animation/fadein";
import ShinyText from "@/components/atoms/animation/shinnyText";
import SpotlightCard from "@/components/atoms/animation/spootlight";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraft/paragraf";
import Image from "next/image";


export default function ColTextImage({ ShinyTextValue, ParagraphValue, SrcImg, AltImg }) {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16">

            {/* TEXT */}
          <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
            <FadeIn>
              <H2>
                {ShinyTextValue}
              </H2>
              <Paragraph>{ParagraphValue}</Paragraph>
            </FadeIn>
          </div>


          {/* IMAGE */}
          <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
          <FadeIn delay={0.6}>
            <SpotlightCard className="w-full aspect-square">
              <div className="relative w-full h-full">
                <Image
                  src={SrcImg}
                  alt={AltImg}
                  fill
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
    </>
  );
}




export function ColImageText({ ShinyTextValue, ParagraphValue, SrcImg, AltImg }) {
  return (
    <>
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
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </SpotlightCard>
          </FadeIn>
          </div>

                      {/* TEXT */}
          <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
            <FadeIn>
              <H2>
                {ShinyTextValue}
              </H2>
              <Paragraph>{ParagraphValue}</Paragraph>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
}
