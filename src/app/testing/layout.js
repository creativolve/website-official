import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function TestLayout({ children }) {
    return (
      <html lang="id">
  
  
        <body className={`${montserrat.className} antialiased bg-[#ffffff]`}>
          {children}
        </body>
      </html>
    );
  }