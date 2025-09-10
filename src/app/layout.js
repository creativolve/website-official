import { Montserrat } from "next/font/google";
import "@/app/css/globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Creativolve Agency - Agensi Digital Kreatif",
  description:
    "Agensi berbasis digital dan teknologi yang menjadi pusat solusi fleksibel untuk layanan digital dan teknologi",
  metadataBase: new URL("https://creativolve.agency"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords:
    "Creativolve Agency, Agensi Digital, Agensi Kreatif, Agensi Pemasaran, Agensi Branding, Solusi Bisnis Digital, Jasa Pembuatan Website, Jasa Desain, Digital Agency Indonesia, Agensi RAG AI, Agensi Teknologi, Inovasi Bisnis Berbasis AI",
  robots: "index, follow, noarchive",
  openGraph: {
    title: "Creativolve Agency - Agensi Digital Kreatif",
    description:
      "Agensi berbasis digital dan teknologi yang menjadi pusat solusi fleksibel untuk layanan digital dan teknologi",
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
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Creativolve Agency",
    url: "https://creativolve.agency",
    image: "https://creativolve.agency/og-image.jpg",
    description:
      "Agensi berbasis digital dan teknologi yang menjadi pusat solusi fleksibel untuk layanan digital dan teknologi",
    logo: "https://creativolve.agency/favicon.png",
    sameAs: [
      "https://www.instagram.com/creativolve_",
      "https://www.linkedin.com/company/creativolve",
      "https://www.tiktok.com/@creativolve_",
    ],
  };

  return (
    <html lang="id">
      <head>
        {/* ✅ SEO */}
        <link rel="canonical" href="https://creativolve.agency" />

        {/* ✅ Preconnect fonts (hemat waktu DNS lookup) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${montserrat.variable} antialiased bg-black overflow-x-hidden`}
      >
        {children}

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L7L5HMSKME"
          strategy="lazyOnload" // 🔥 jadi lazy
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-L7L5HMSKME');
  `}
        </Script>

        {/* ✅ JSON-LD */}
        <Script id="json-ld" type="application/ld+json" strategy="lazyOnload">
          {JSON.stringify(jsonLd)}
        </Script>
      </body>
    </html>
  );
}
