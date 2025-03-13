import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});



export const metadata = {
  title: "Creativolve Agency",
  description: "Creative and innovative digital agency focused on delivering professional and innovative digital solutions.",

  icons: {
    icon: "/favicon.svg"
  },

  keywords: "Creativolve, Agency, Digital Solutions, Creative Agency, Web Development",

  robots: "index, follow", 

  viewport: "width=device-width, initial-scale=1.0",

  openGraph: {
    title: "Creativolve Agency",
    description: "Creative and innovative digital agency focused on delivering professional and innovative digital solutions.",
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
