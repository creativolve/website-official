import { Montserrat } from "next/font/google";
import "@/css/globals.css";

export const metadata = {
  title: "Asisten Digital | Creativolve Agency",
  description:
    "Asisten Digital Creativolve adalah chatbot cerdas berbasis AI yang siap membantu Anda memahami layanan kami, menjawab pertanyaan, dan memberikan solusi sesuai kebutuhan digital Anda — tersedia 24/7 dengan respons cepat dan pendekatan yang ramah.",  
    keywords: "Creativolve Agency, Agensi Pemasaran, Solusi Bisnis Digital",

    robots: "index, follow, noarchive",

    openGraph: {
      title: "Asisten Digital | Creativolve Agency",
      description:
      "Asisten Digital Creativolve adalah chatbot cerdas berbasis AI yang siap membantu Anda memahami layanan kami, menjawab pertanyaan, dan memberikan solusi sesuai kebutuhan digital Anda — tersedia 24/7 dengan respons cepat dan pendekatan yang ramah.",  
      url: "https://creativolve.agency/",
      type: "website",
      images: [
        {
          url: "https://creativolve.agency/images/Pusat-layanan/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Creativolve Agency",
        },
      ],
    },
  };


export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
  };

    const montserrat = Montserrat({
      weight: ["400", "500", "600", "700"],
      subsets: ["latin"],
      display: "swap",
    });

    export default function PageLayout({ children }) {
      return (
        <div className={`${montserrat.className} relative antialiased bg-[#171717]`}>
          {children}
        </div>
      );
    }
    