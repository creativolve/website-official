import "@/css/globals.css";

export const metadata = {
  title: "Pusat Layanan Creativolve Agency",
  description:
    "Pusat layanan yang tampil elegan dengan penerapan AI dalam sistem Asisten Digital kami!",
  metadataBase: new URL("https://creativolve.agency"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: "Creativolve Agency, Agensi Digital, Agensi Kreatif, Agensi Pemasaran, Agensi Branding, Solusi Bisnis Digital, Jasa Pembuatan Website, Jasa Desain, Digital Agency Indonesia, Agensi RAG AI, Agensi Teknologi, Inovasi Bisnis Berbasis AI",
  robots: "index, follow, noarchive",
  openGraph: {
    title: "Pusat Layanan Creativolve Agency",
    description:
      "Pusat layanan yang tampil elegan dengan penerapan AI dalam sistem Asisten Digital kami!",
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
  maximumScale: 1,
  userScalable: "no",
};

export default function PageLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}