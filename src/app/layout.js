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
    icon: "https://creativolve.agency/favicon.png",
    shortcut: "https://creativolve.agency/favicon.png",
    apple: "https://creativolve.agency/favicon.png",
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

export const viewport = "width=device-width, initial-scale=1";

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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L7L5HMSKME"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L7L5HMSKME');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.className} relative antialiased bg-[#ffffff]`}>
        {children}
      </body>
    </html>
  );
}
