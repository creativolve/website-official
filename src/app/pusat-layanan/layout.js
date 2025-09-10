import { Montserrat } from "next/font/google";
import "@/app/css/globals.css"

export const metadata = {
  title: "Pusat Layanan Creativolve Agency",
  description:
    "Pusat Layanan resmi Creativolve Agency — tempat Anda mendapatkan bantuan, informasi layanan, dan solusi terbaik untuk kebutuhan digital Anda. AI kami siap mendampingi Anda 24/7 dengan respons cepat dan pelayanan yang empatik.",
    keywords: "Pusat Layanan Creativolve, Layanan Pelanggan Creativolve, Customer Support Creativolve, Bantuan Teknis Creativolve, Dukungan Klien Creativolve, Pusat Bantuan Agensi Digital, Creativolve Service Center, Layanan Purna Jual, Hubungi Creativolve, Support Creativolve Agency",

  robots: "index, follow, noarchive",

  openGraph: {
    title: "Asisten Digital | Creativolve Agency",
    description:
      "Pusat Layanan resmi Creativolve Agency — tempat Anda mendapatkan bantuan, informasi layanan, dan solusi terbaik untuk kebutuhan digital Anda. AI kami siap mendampingi Anda 24/7 dengan respons cepat dan pelayanan yang empatik.",
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
    <div className="bg-black">
      {children}
    </div>
  );
}