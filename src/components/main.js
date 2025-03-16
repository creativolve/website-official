"use client";

import Navbar from "./navbar";
import Hero from "./hero";

export default function Main() {
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
