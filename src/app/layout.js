

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

  description: "Solusi efektif untuk beralih ke Bisnis Digital dengan strategi branding dan marketing yang tepat, tanpa mengkhawatirkan biaya anggaran.",

  metadataBase: new URL("https://creativolve.agency"),

  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },

  keywords:
    "Creativolve, Agency, Digital Solutions, Creative Agency, Agensi Marketing",

  robots: "index, follow",

  openGraph: {
    title: "Creativolve Agency | Creative Digital Solutions",

    description:
     "Solusi efektif untuk beralih ke Bisnis Digital dengan strategi branding dan marketing yang tepat, tanpa mengkhawatirkan biaya anggaran.",

    url: "https://creativolve.agency/",
    type: "website",
    images: [
      {
        url: "/ogg-image.jpg",
        width: 1080,
        height: 1080,
        alt: "Creativolve Agency",
      },
    ],
  },
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({ children }) {

  return (
    <html lang="id">
      <head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-L7L5HMSKME"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload  ">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L7L5HMSKME');
        `}
      </Script>
      </head>

      <body className={`${montserrat.className} relative antialiased bg-[#ffffff]`}>
        {children}
      </body>
    </html>
  );
}
