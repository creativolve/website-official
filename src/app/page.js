import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
    {/* Logo */}
    <div className="mb-6">
      <Image
        src="/images/logo.svg"
        alt="Creativolve Logo"
        width={100}
        height={100}
        Priority
      />
    </div>

    {/* Main Heading */}
    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
      Creativolve Agency
    </h1>

    {/* Tagline */}
    <p className="text-sm md:text-lg text-[#C6C6C6] 
    lg:w-[30vw]">
    Akan Hadir! Untuk membangun Brand Digital Anda dengan Strategi Terbaik & Fleksibel dengan menerapkan sistem automasi.
    </p>
  </section>
  );
}
