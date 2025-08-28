import dynamic from "next/dynamic";

// tetap static import
import CurvedLoop from "@/components/atoms/animation/curvedLoop";
import BlogServe from "@/components/organism/blog/blogServe";
import DarkVeil from "@/components/atoms/background/darkveli/darkveli";
import Footer from "@/components/organism/footer/footer";


// dynamic import
const Navbar = dynamic(() => import("@/components/molecules/navbar/navbar"), { ssr: true });
const HeroSection = dynamic(() => import("@/components/organism/hero/hero"), { ssr: true });
const TentangServe = dynamic(() => import("@/components/organism/tentang/tentang-serve"), { ssr: true});
const Layanan = dynamic(() => import("@/components/organism/layanan/layanan"), { ssr: true });
const Mengapa = dynamic(() => import("@/components/organism/mengapa/mengapa"), { ssr: true });
const PusatLaySection = dynamic(() => import("@/components/organism/pusatLayanan/pusatLayanan"), { ssr: true });

export default async function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-70 lg:h-120 absolute">
        <DarkVeil />
      </div>

      <main className="z-[10] px-10 md:px-30 lg:px-30">
        <HeroSection />

        <div className="z-[10] mt-[-240px] lg:mt-[-150px]">
          <CurvedLoop
            marqueeText="Digital ✦ Creative ✦ Solution ✦ With ✦ Technology ✦"
            speed={4}
            curveAmount={-220}
            direction="left"
            interactive={false}
            className="text-[200px] lg:text-[100px]"
          />
        </div>

        <TentangServe />
        <Layanan />
        <Mengapa />
        <BlogServe />
        <PusatLaySection />
        <Footer />
      </main>
    </>
  );
}
