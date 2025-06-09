import Heading from "./heading"
import Paragraft from "./paragraft"
import Button from "./button"
import SocialMedia from "./iconSocial"
import Image from "next/image"




export default function Hero() {

    return(
        <>
            <div className="heroSection w-full h-[110vh] lg:h-[120vh]">
                
                        <Image
                        src='/images/hero_section/circle.png'
                        width={500}
                        height={500}
                        priority
                        alt="Circle"
                        className="top-[480px] filter drop-shadow-[0_0_40px_#00E5FF] translate-y-[20%] w-[50vw] pointer-events-none select-none  right-0 absolute
                        md:translate-y-[-20%] md:w-[50vw]
                        lg:translate-y-[-65%] lg:w-[30vw]
                        "
                        />
                <div
                className="
                content flex flex-col space-y-7 justify-center w-[80%] h-full
                md:w-[60%]
                lg:w-[50%]
                ">
                <Heading
                    index={0}
                />
                <Paragraft
                    index={0}
                />
                <Button
                    name='Pusat Layanan'
                    href='/pusat-layanan'
                />
                <SocialMedia/>
                </div>
            </div>
        </>
    )
}