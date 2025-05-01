import { Montserrat } from "next/font/google";
import "@/css/globals.css";

export const metadata = {
    title: "Asisten Digital | Creativolve Agency",
    description:
      "Customer Service melayani 24 jam untuk anda silahkan gunakan Customer Service ini untuk menyelesaikan masalah anda dan menanyakan layanan yang kami miliki!.",
    keywords: "Creativolve Agency, Agensi Pemasaran, Solusi Bisnis Digital",

    robots: "index, follow, noarchive",

    openGraph: {
      title: "Asisten Digital | Creativolve Agency",
      description:
        "Solusi efektif untuk beralih ke Bisnis Digital dengan strategi branding dan marketing yang tepat, tanpa mengkhawatirkan biaya anggaran.",
      url: "https://creativolve.agency/",
      type: "website",
      images: [
        {
          url: "https://creativolve.agency/og-image.jpg",
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
    