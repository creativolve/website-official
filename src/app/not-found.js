import Image from "next/image";


export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center font-sans gap-10">
              <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={600}
                  height={600}
                  priority
                  className="w-[clamp(11rem,9vw,11rem)] select-none pointer-events-none"
                />
        <div className="flex items-center">
          <h1 className="text-4xl font-semibold border-r-2 border-gray-400 pr-4">404</h1>
          <h2 className="text-lg font-normal ml-4">Halaman ini tidak ditemukan.</h2>
        </div>
      </div>
    );
  }
      