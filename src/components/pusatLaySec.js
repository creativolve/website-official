import Image from "next/image"
import Heading from "./heading"
import Button from "./button"


export default function PusatLaySec(){

    return(

        <>
        <div id="pusatLayanan"
        className="
        flex flex-col justify-center space-y-20 h-[190vh]
        lg:h-[120vh]
        ">
            <div className="title w-full lg:w-[60%]">
                <Heading index={4}/>
            </div>
                            <div className="h-fit">
                                <div 
                                className="
                                content flex items-center bg-[#21252C] w-full h-fitt p-[15px] rounded-[15px] flex-col-reverse gap-8 overflow-hidden relative
                                lg:p-[15px] lg:flex-row
                                ">
                                    <Image
                                        src="/images/card/circle.png"
                                        width={100}
                                        height={100}
                                        priority
                                        quality={100}
                                        alt="lightning"
                                        className={`absolute  w-[500px] opacity-[0.12] blur-2xl z-[0] pointer-events-none select-none
                                        bottom-[-10vw] right-[-20vw]
                                    
                                        md:bottom-[-25vw] md:right-[-20vw]
                                        lg:bottom-[-20vw] lg:right-[200]
                                        `}
                                    />
                                    <div 
                                    className="text w-full mt-[-60px] mb-[30px] flex flex-col space-y-6 lg:w-[60%] lg:px-[3rem] lg:mt-0 z-[30] lg:mb-0">
                                        <Heading index={6}/>
                                        <Button name="Pusat Layanan!" href="/pusat-layanan"/>
                                    </div>
                                    <div 
                                        className="relative rounded-[12px] w-[100%] h-[350px]
                                        lg:w-[50%] lg:h-[50vh] lg:rounded-[5px]">
                                        <Image
                                            src='/images/pusatLaySec/image.png'
                                            fill
                                            priority 
                                            alt="image"
                                            className="object-contain pointer-events-none select-none"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                     </div>
                                </div>
                            </div>
        </div>
        </>
    )
}