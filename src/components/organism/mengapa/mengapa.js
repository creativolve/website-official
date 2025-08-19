import FadeIn from "@/components/atoms/animation/fadein";
import InfiniteScroll from "@/components/atoms/animation/infiniteScroll";
import { ShinyButton } from "@/components/atoms/button/button";
import { H2 } from "@/components/atoms/heading/heading";

export default function Mengapa() {
  const items = [
    { content: <h2 className="font-bold">Fleksibilitas Budget</h2> },
    { content: <h2 className="font-bold">Solusi Digital Lengkap</h2> },
    { content: <h2 className="font-bold">Transparansi Project</h2> },
    {
      content: (
        <h2 className="font-bold">Pelayanan Yang Efektif Dan Efisien</h2>
      ),
    },
  ];

  return (
    <section
      id="mengapa-kami"
      className="flex flex-col justify-center space-y-10 items-center lg:h-[170vh]"
    >
      <div className="flex lg:justify-end">
        <div className="content lg:w-1/2 space-y-2">
          <FadeIn delay={0.4}>
            <ShinyButton>Pilihan Terbaik!</ShinyButton>
          </FadeIn>
          <FadeIn>
            <H2>Kami pilihan terbaik untuk kebutuhan digital anda!</H2>
          </FadeIn>
        </div>
      </div>
        <div className="w-[90%] lg:w-full mx-auto relative overflow-hidden">
          <div className="pointer-events-none">
            <InfiniteScroll
              items={items}
              isTilted={true}
              tiltDirection="left"
              autoplay={true}
              autoplaySpeed={1.5}
              autoplayDirection="up"
              pauseOnHover={true}
            />
          </div>

          {/* vignette overlay */}
          <div className="pointer-events-none absolute inset-0">
            {/* atas */}
            <div
              className="absolute top-0 left-0 right-0 h-10 
                    bg-gradient-to-b from-black/100 to-transparent"
            ></div>
            {/* bawah */}
            <div
              className="absolute bottom-0 left-0 right-0 h-10 
                    bg-gradient-to-t from-black/100 to-transparent"
            ></div>
            {/* kiri */}
            <div
              className="absolute top-0 left-0 bottom-0 w-10 
                    bg-gradient-to-r from-black/60 to-transparent"
            ></div>
            {/* kanan */}
            <div
              className="absolute top-0 right-0 bottom-0 w-10 
                    bg-gradient-to-l from-black/60 to-transparent"
            ></div>
          </div>
        </div>
    </section>
  );
}
