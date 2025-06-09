import "@/css/effect.css"
import Link from "next/link";
import Image from "next/image";


export default function BackButton({color = 'gradient'}) {

    return(
        <>
          <Link
            href="/"
            className={`
              ${color === 'gradient'
                ? "background-gradient"
                : "bg-black"
              }

                rounded-full p-2 transition-all duration-200 ease-in-out flex gap-5 text-white justify-center items-center top-5 left-4
                fixed z-[100] group
                
                hover:shadow-md hover:bg-[#ffffff] hover:text-black group
                active:shadow-md active:bg-[#cfcfcf] active:text-black
                `}
          >
            <Image
              src="/images/back_icon.png"
              alt="kembali"
              width={100}
              height={100}
              className={`
                ${color === 'gradient'
                  ? ''
                  : 'invert group-hover:invert-0'
                }
                    w-[2vw] transition-all duration-200 ease-in-out 
                    lg:w-[1.6vw] object-cover select-none
                    `}
            />
          </Link>
        </>
    )
}