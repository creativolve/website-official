import Image from "next/image";
import Navbar from "./components/navbar.js";
import Hero from "./components/hero.js";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="
      lg:px-[200px] lg:py-[10px]
      "
      >
        <Hero />
        
      </main>
    </>
  );
}
