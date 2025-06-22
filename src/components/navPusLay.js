  "use client"

  import { useState } from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faBars, faXmark, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
  import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
  import Link from "next/link";

  export default function NavPusatLayanan({ page = 'Asisten Digital' }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const contactList = [
      {
        icon: faEnvelope,
        contact: 'Email',
        href: 'mailto:creativolve.agency@gmail.com',
      },
      {
        icon: faInstagram,
        contact: 'Instagram',
        href: "https://www.instagram.com/creativolve_",
      },
      {
        icon: faWhatsapp,
        contact: 'Whatsapp',
        href: 'https://wa.me/6288289158984',
      },
    ];

    return (
      <nav className="w-fit">
        {/* Menu Toggle Button */}
        <div
          onClick={toggleMenu}
          className={`open text-[clamp(1.5rem,3vw,1.8rem)] cursor-pointer w-fit h-fit  fixed text-white
            ${isOpen 
              ? 'top-5 left-6 z-50'
              : 'top-9 lg:top-3 left-6 z-0'
            }`}
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </div>

        {/* Navigation Container */}
        <div className={`
          fixed top-0 left-0 h-screen bg-[#17181A] z-40
          transition-all duration-300 ease-in-out 
          ${isOpen ? 'w-60' : 'w-0'}
          overflow-hidden shadow-lg
        `}>
          <div className={`
            content p-6 pt-20
            transition-opacity duration-300 delay-150
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="flex flex-col space-y-6">
              <Link
                href='/pusat-layanan'
                className="flex items-center space-x-3 text-[#cccccc] hover:text-[#ffffff] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>Kembali</span>
              </Link>

              <Link
              href={page === 'Asisten Digital' ? '/pusat-layanan/pengajuan' : '/pusat-layanan/asisten-digital'}
              className="text-[#cccccc] hover:text-[#ffffff] transition-colors text-lg"
              onClick={() => setIsOpen(false)}
              >
              {page === 'Asisten Digital' ? 'Pengajuan' : 'Asisten Digital'}
              </Link>

              <Link
                href='/'
                className="flex items-center space-x-3 text-[#cccccc] hover:text-[#ffffff] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>Beranda</span>
              </Link>


              {/* Contact Section */}
              <div className="border-t pt-4 mt-6">
                <h3 className="text-sm font-semibold text-[#ffffff] uppercase tracking-wide mb-3">
                  Kontak Lainnya
                </h3>
                <div className="space-y-5">
                  {contactList.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      target="_blank"
                      className="flex items-center space-x-2 text-[#cccccc] hover:text-[#ffffff] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <span>{item.contact}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div
  className={`
    fixed inset-0 bg-[#0000005a] backdrop-blur-2xl z-30
    transition-opacity duration-300
    ${isOpen ? 'opacity-100 pointer-events-auto delay-100' : 'opacity-0 pointer-events-none delay-0'}
  `}
  onClick={toggleMenu}
/>


      </nav>
    );
  }
