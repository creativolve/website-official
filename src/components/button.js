'use client'

import Link from 'next/link'
import { LazyMotion, domAnimation, m } from "framer-motion";

const Button = ({ name, href, target }) => {
  return (
    <>
    <LazyMotion features={domAnimation}>

      <Link href={href} target={target} data-nonsnipet>
        <m.button
          data-nonsnipet
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 60,
              damping: 14,
            },
          }}
          viewport={{ once: true, amount: 0.2 }}
          className={`
            px-[20px] py-[5px] rounded-3xl text-[3.8vw] cursor-pointer border-2 border-transparent bg-[#ffffff] text-[#262626] 
            md:text-[3vw]
            lg:px-[25px] lg:py-[5px] lg:text-[1vw] transition-all duration-100 ease-in-out
            
            hover:bg-transparent hover:text-[#ffffff] hover:border-[#ffffff] hover:translate-y-[-5px] 
            active:bg-transparent active:text-[#262626] active:border-[#ffffff] active:translate-y-[-5px]
          `}
        >
          {name}
        </m.button>
      </Link>
    </LazyMotion>
    </>
  )
}

export default Button
