
  

  import "@/css/globals.css";

  export const metadata = {
    title: "Tentang Creativolve Agency",
    description:
      "Creativolve Agency adalah sebuah marketing and branding agency yang hadir sebagai solusi inovatif untuk menjawab kebutuhan digital, branding dan strategi bisnis masa kini",
    metadataBase: new URL("https://creativolve.agency"),
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    keywords: "Creativolve Agency, Agensi Digital, Agensi Kreatif, Agensi Pemasaran, Agensi Branding, Solusi Bisnis Digital, Jasa Pembuatan Website, Jasa Desain, Digital Agency Indonesia, Agensi RAG AI, Agensi Teknologi, Inovasi Bisnis Berbasis AI",

    robots: "index, follow, noarchive",

    openGraph: {
      title: "Tentang Creativolve Agency",
      description:
        "Creativolve Agency adalah sebuah marketing and branding agency yang hadir sebagai solusi inovatif untuk menjawab kebutuhan digital, branding dan strategi bisnis masa kini",
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

    return (
        <div className={`relative antialiased bg-[#17181a] h-fit`}>
          {children}
        </div>
    );
  }
