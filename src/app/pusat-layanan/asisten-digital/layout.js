import "@/css/globals.css";

export const metadata = {
    title: "Asisten Digital Creativolve Agency",
    description:
      "Asisten Digital Creativolve adalah chatbot cerdas berbasis AI yang siap membantu Anda memahami layanan kami, menjawab pertanyaan, dan memberikan solusi sesuai kebutuhan digital Anda tersedia 24/7 dengan respons cepat dan pendekatan yang ramah.",
    keywords: "Creativolve, Agensi RAG AI, Agensi Pertama RAG, Retrieval Augmented Generation, AI Agency Indonesia, Digital Agency AI, Inovasi Teknologi",
  
    robots: "index, follow, noarchive",
  
    openGraph: {
      title: "Asisten Digital Creativolve Agency",
      description:
        "Menghadirkan revolusi digital melalui integrasi RAG dan AI. Creativolve menjadi pionir agensi di Indonesia yang menerapkan teknologi ini secara profesional.",
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