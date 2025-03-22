

import { Montserrat } from "next/font/google";
import "@/css/typografi.css";
import Script from "next/script";
import Blogs from "@/data/blog.json";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const blog = Blogs.find((blog) => blog.slug === blog.slug );

export const metadata = blog ? {
  ...blog.metaTag, // Ambil data metaTag dari JSON
} : {};

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
