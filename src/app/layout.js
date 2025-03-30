import { Montserrat } from "next/font/google";
import "@/css/globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Creativolve Agency | Creative Digital Solutions",
  description:
    "Solusi efektif untuk beralih ke Bisnis Digital dengan strategi branding dan marketing yang tepat, tanpa mengkhawatirkan biaya anggaran.",
  metadataBase: new URL("https://creativolve.agency"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: "Creativolve Agency, Agensi Pemasaran, Solusi Bisnis Digital",

  robots: "index, follow, noarchive",

  openGraph: {
    title: "Creativolve Agency | Creative Digital Solutions",
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
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Creativolve Agency",
    url: "https://creativolve.agency",
    image: "https://creativolve.agency/ogg-image.jpg",
    description:
      "Solusi efektif untuk beralih ke Bisnis Digital dengan strategi branding dan marketing yang tepat, tanpa mengkhawatirkan biaya anggaran.",
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

        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body className={`${montserrat.className} relative antialiased bg-[#ffffff]`}>
        {children}
      </body>
    </html>
  );
}
