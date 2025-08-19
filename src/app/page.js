import HeroSection from "../components/organism/hero/hero";
import Navbar from "@/components/molecules/navbar/navbar";
import DarkVeil from "@/components/atoms/background/darkveli/darkveli";
import CurvedLoop from "@/components/atoms/animation/curvedLoop";
import TentangServe from "../components/organism/tentang/tentang-serve";
import Layanan from "@/components/organism/layanan/layanan";
import Mengapa from "@/components/organism/mengapa/mengapa";
import BlogServe from "@/components/organism/blog/blogServe";
import PusatLaySection from "@/components/organism/pusatLayanan/pusatLayanan";
import Footer from "@/components/organism/footer/footer";




export default function Home() {
  return (
    <>
      <Navbar />

      <div className="w-full h-70 lg:h-120 absolute ">
        <DarkVeil />
      </div>
      <main
        className="
        z-[10] 
      px-4
      lg:px-30
      "
      >
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
        <Footer/>
      </main>
    </>
  );
}
