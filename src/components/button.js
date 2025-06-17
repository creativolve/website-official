import Link from 'next/link'
import "@/css/effect.css"

const Button = ({ name, href, target = '_self', onClick, style = 'solid'}) => {
  return (
    <>

      <Link href={href} target={target} data-nonsnipet>
        <button
        onClick={onClick}
          data-nonsnipet
          className={` z-[500]
            ${style === 'solid'
              ? 'border-transparent background-gradient text-black'
              : 'border-[#00E5FF] bg-transparent'
            }

            px-[20px] py-[5px] rounded-3xl text-[clamp(0.7rem,1.5vw,0.8rem)] cursor-pointer border-2 min-w-[100px]            shadow-[0_0_15px_#00E5FF] 
            lg:px-[25px] lg:py-[5px] transition-all duration-100 ease-in-out
            
            hover:translate-y-[-5px] hover:shadow-[#00E5FF] hover:shadow-lg
          `}
        >
          {name}
        </button>
      </Link>
    </>
  )
}

export default Button