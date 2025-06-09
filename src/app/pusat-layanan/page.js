import Button from "@/components/button";
import Heading from "@/components/heading";
import IconSocialMedia from "@/components/iconSocial";
import Image from "next/image";


export default function PusatLayananPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/pusatLayPage/background.png"
        alt="bg"
        width={500}
        height={500}
        priority
        className="w-full h-[40%] object-cover absolute z-[0] top-0 left-0 pointer-events-none select-none lg:left-0 lg:h-auto"
      />
            <Image
        src="/images/pusatLayPage/circle.png"
        alt="bg"
        width={500}
        height={500}
        priority
        className="w-full absolute z-0 bottom-0 left-0 pointer-events-none select-none lg:left-0 lg:h-auto"
      />

      {/* Logo */}
      {/* <div className="absolute z-10 top-[150px] right-[50%] translate-x-[50%]">

      </div> */}

      {/* Content */}
      <div className="relative z-10 w-[80%] flex flex-col space-y-10 justify-center items-center lg:w-[60%] px-4 text-center">
      <Image
          src="/images/logo.png"
          alt="logo"
          width={600}
          height={600}
          priority
          className="w-[clamp(11rem,18vw,26rem)]"
        />
        <Heading index={7} paragraft="center" />
        <div className="button flex gap-5 flex-col md:flex-row">
          <Button 
          name="Pengajuan" 
          href="/pusat-layanan/pengajuan" />
          <Button
            name="Asisten Digital"
            href="/pusat-layanan/asisten-digital"
            style="border"
          />
        </div>
        <IconSocialMedia/>
      </div>
    </div>
  );
}
