import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-montserrat">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div id="logo" className="flex">
          <Image
            src="/images/logo.svg" // Tanpa titik di depan
            alt="Logo"
            width={50}
            height={50}
          />
        </div>

      </main>
    </div>
  );
}
