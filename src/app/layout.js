import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});



export const metadata = {
  title: "Creativolve Agency",
  description: "Agensi Digital Kreatif dan inovatif yang berfokus pada penyampaian solusi digital yang profesional dengan penerapan AI Automation",
  metadataBase: new URL('https://creativolve.agency'), 

  icons: {
    icon: "/images/favicon.svg"
  },

  keywords: "Creativolve, Agency, Digital Solutions, Creative Agency, Agensi Marketing",

  robots: "index, follow", 


  openGraph: {
    title: "Creativolve Agency - Agensi Digital Kreatif",
    description: "Creativolve Agency adalah sebuah agency full service dengan role model ‘Digital Branding Dan Strategy Branding’ sebagai role utama, Agensi Digital Kreatif dan inovatif yang berfokus pada penyampaian solusi digital yang profesional dengan penerapan AI Automation",
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

export const viewport = 'width=device-width, initial-scale=1';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${montserrat.className} antialiased bg-[#ffffff]`}
      >
        {children}
      </body>
    </html>
  );
}
