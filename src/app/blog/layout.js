import "@/app/css/globals.css"

  export const metadata = {
      title: "Eksplorasi Wawasan Terbaru seputar Bisnis, Branding, dan Teknologi Digital",
      description:
        "temukan materi yang kamu butuhkan untuk memulai bisnis digital dan sukses mengembangkannya!",
    
      robots: "index, follow",
    
      openGraph: {
        title: "Eksplorasi Wawasan Terbaru seputar Bisnis, Branding, dan Teknologi Digital",
        description:
          "temukan materi yang kamu butuhkan untuk memulai bisnis digital dan sukses mengembangkannya!",
        url: "https://creativolve.agency/",
        type: "website",
        images: [
          {
            url: "https://creativolve.agency/images/Pusat-layanan/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Creativolve Agency",
          },
        ],
      },
    };
  
  export const viewport = {
    width: "device-width",
    initialScale: 1
  };
  

export default function PageLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}