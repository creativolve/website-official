import GradientButton from "@/components/atoms/button/button";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const listNav = [
    { name: "Tentang", href: "#tentang" },
    { name: "Layanan", href: "#layanan" },
    { name: "Mengapa Kami", href: "#mengapa-kami" },
    { name: "Blog", href: "#blog" },
    { name: "Pusat Layanan", href: "#pusat-layanan" },
  ];

  return (
    <nav className="navbar z-[9999] fixed top-6 left-1/2 -translate-x-1/2 px-4
         w-[90%] md:w-[80%] 
        backdrop-blur-md bg-black/30 border border-white/10 
        rounded-full shadow-lg">
      
      {/* Navbar start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-5 z-[1] p-2 
              shadow bg-[#1b2024]  backdrop-blur-[20px] rounded-box w-60">
            {listNav.map((item, index) => (
              <li key={index}
              className={`py-3 text-sm border-b-1 ${index == 4 ? 'border-none' : ''} border-[#313131]`}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
<Image
  src="/logo/logo.png"
  alt="Logo Creativolve Agency"
  width={130}
  height={130}
  sizes="(max-width: 768px) 80px, 130px"
  className="w-[80px] md:w-[130px] h-auto"
  priority
/>
            
      </div>

      {/* Navbar center (desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          {listNav.map((item, index) => (
<li
  key={index}
  className="text-sm"
  style={{ backgroundColor: 'transparent' }}
>
  <Link href={item.href} className="rounded-full hover:bg-[#0184ff]">{item.name}</Link>
</li>

          ))}
        </ul>
      </div>

      {/* Navbar end */}
      <div className="navbar-end">
        <GradientButton href="/pusat-layanan#kontak">Hubungi Kami!</GradientButton>
      </div>
    </nav>
  );
}
