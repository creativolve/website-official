import "@/css/effect.css"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";

export default function NavigationButton({
  color = 'gradient', 
  href = '/',
  iconType = 'back' // 'back' atau 'home'
}) {
    return(
        <>
          <Link
            href={href}
            className={`
              ${color === 'gradient'
                ? "background-gradient"
                : "bg-black"
              }
              rounded-full p-4 transition-all duration-200 ease-in-out flex gap-5 text-white justify-center items-center top-5 left-7
              fixed z-[100] group
              hover:shadow-md hover:bg-[#ffffff] hover:text-black group
              active:shadow-md active:bg-[#cfcfcf] active:text-black
            `}
          >
            <FontAwesomeIcon 
              icon={iconType === 'back' ? faArrowLeft : faHome}
              className={`
                ${color === 'gradient'
                  ? ''
                  : 'invert group-hover:invert-0'
                }
                w-[8vw] transition-all duration-200 ease-in-out 
                lg:w-[1.6vw] object-cover select-none
              `}
            />
          </Link>
        </>
    )
}