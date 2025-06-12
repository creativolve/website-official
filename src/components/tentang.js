import Image from "next/image"
import Heading from "./heading"
import Paragraft from "./paragraft"
import Button from "./button"





export default function Tentang(){

    return(
        <>
        <section
        id="tentang"
        className="
        container w-full h-[150vh] flex justify-center items-center my-20 lg:h-[120vh]
        ">
            <div
            className="
            bg-[#21252C] flex w-full h-fitt justify-between shadow-[0_0_20px_#00E5FF30]  p-[15px] items-center rounded-[30px] flex-col gap-8
            lg:p-[30px] lg:flex-row
            ">
                    <div 
                    className="relative rounded-[20px]  w-[100%] h-[350px] shadow-[0_0_30px_#000000]
                    lg:w-[40%] lg:h-[70vh] lg:rounded-[15px] overflow-hidden">
                    <Image
                        src='/images/tentang_section/foto.png'
                        fill
                        priority
                        quality={100}
                        alt="image"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    </div>
                <div
                className="
                img flex flex-col space-y-5 mb-[10px]
                lg:w-[50%] lg:mb-[0px]
                ">
                    <Heading index={1}/>
                    <Paragraft index={1}/>
                    <Button name='Tentang kami' href='/tentang'/>
                </div>
            </div>
        </section>
        </>
    )
}