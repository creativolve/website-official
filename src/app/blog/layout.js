

import { Montserrat } from "next/font/google";



const montserrat = Montserrat({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
  });


export const metadata = {
    title: "Creav Blog - Tingkatkan Pemahamanmu Sebelum Memulai Bisnis Digital",
  
    description: "Pelajari artikel kami untuk pemahaman lebih dalam terkait strategi,    branding, marketing dan sistem big data untuk bisnis.",
  
    metadataBase: new URL("https://creativolve.agency"),
  
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
  
    keywords:
      "Creav Blog, Digital Solutions, Creative Agency, Agensi Marketing",
  
    robots: "index, follow",
  
    openGraph: {
      title: "Creav Blog - Tingkatkan Pemahamanmu Sebelum Memulai Bisnis Digital",
  
      description:
       "Pelajari artikel kami untuk pemahaman lebih dalam terkait strategi,    branding, marketing dan sistem big data untuk bisnis.",
  
      url: "https://creativolve.agency/",
      type: "website",
      images: [
        {
          url: "/ogg-image.jpg",
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
  
        <body className={`${montserrat.className} relative antialiased bg-[#ffffff]`}>
          {children}
        </body>
      </html>
    );
  }


