import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const allBreadcrumbs = [
  [
    { name: "Layanan", href: "/layanan" },
    { name: "Kelas Bisnis", href: null },
  ],
  [
    { name: "Layanan", href: "/layanan" },
    { name: "Layanan Umum", href: null },
  ],
];

export default function BreadcrumbNav({ index = 0 }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>{
      setScrolled(window.scrollY > 5);
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  const breadcrumbs = allBreadcrumbs[index] || [];

  return (
    <nav
      aria-label="Breadcrumb"
      className="
        flex items-center gap-3 px-[20px] pt-[60px] pb-[10px]
        lg:px-[260px] lg:pt-[100px] lg:pb-[10px] lg:gap-4
      "
    >
      <div
      className={`
      flex items-center gap-3 px-5 py-2  rounded-full transition-all duration-150 ease-in-out

      ${scrolled? 'bg-[#262626] fixed' : 'bg-transparent'}
      `}>
        <Link href="/" 
          className="group">
          <Image
            src="/images/Back Button.png"
            alt="Kembali"
            width={40}
            height={40}
            className={`
              w-[7vw] lg:w-[1.5vw] object-cover select-none cursor-pointer transition-all duration-150 ease-in-out
              ${scrolled ? 'invert' : ''}
            `}
          />
        </Link>


        {breadcrumbs.map((item, i) => (
          <div key={i} className="flex items-center gap-3 lg:gap-5">
            <ChevronRight size={16} 
            className={`
            select-none
            ${scrolled? 'text-white' : 'text-gray-200'}
         `} />
            {item.href ? (
              <Link
                href={item.href}
                className={`select-none text-[3.4vw] lg:text-[1.1vw] hover:underline transition-all duration-150 ease-in-out
                ${scrolled? 'text-white' : 'text-[#262626]'}
                  `}
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={`px-[5px] rounded-full select-none text-[3.4vw] lg:text-[1.1vw] transition-all duration-150 ease-in-out
                ${scrolled? 'text-[#262626] bg-white' : 'text-white bg-[#262626]'}
                  `}
              >
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
