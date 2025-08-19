import { Montserrat } from "next/font/google";
import "@/app/css/globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap", // biar cepat load
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
    image: "https://creativolve.agency/ogg-image.jpg",
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
        <link rel="canonical" href="https://creativolve.agency" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
        `}
        </Script>

        <Script id="ga-consent" strategy="lazyOnload">
          {`
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied'
          });

          gtag('js', new Date());

          function enableTracking() {
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
            gtag('config', 'G-L7L5HMSKME', { anonymize_ip: true });
          }
        `}
        </Script>

        <Script
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          as="style"
        ></Script>

        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body
        className={`${montserrat.variable} antialiased bg-black overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
