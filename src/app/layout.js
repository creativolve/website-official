

import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Creativolve Agency",

  description:
    "Creativolve Agency adalah agensi digital kreatif yang menyediakan solusi branding dan strategi profesional dengan penerapan AI Automation.",

  metadataBase: new URL("https://creativolve.agency"),

  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png', 
  },

  keywords:
    "Creativolve, Agency, Digital Solutions, Creative Agency, Agensi Marketing",

  robots: "index, follow",

  openGraph: {
    title: "Creativolve Agency - Agensi Digital Kreatif",

    description:
      "Creativolve Agency adalah agensi digital kreatif yang menyediakan solusi branding dan strategi profesional dengan penerapan AI Automation.",

    url: "https://creativolve.agency/",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creativolve Agency",
      },
    ],
  },
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({ children }) {

  return (
    <html lang="id">

<Script
        src="https://www.googletagmanager.com/gtag/js?id=G-L7L5HMSKME"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L7L5HMSKME');
        `}
      </Script>

      <body className={`${montserrat.className} antialiased bg-[#ffffff]`}>
        {children}
      </body>
    </html>
  );
}
