import Image from "next/image"
import Heading from "./heading"
import Button from "./button"


export default function Blogsec(){

    return(
        <>
        <div id="blog"
        className="
        h-[200vh] flex items-center
        lg:h-[144vh]
        ">
            <div 
            className="
            flex gap-4 flex-col
            lg:grid lg:grid-cols-1 lg:grid-rows-2 lg:gap-3 h-auto
            ">

                {/* OPENING */}
                <div className="h-fit">
                    <div 
                    className="
                    content flex items-center bg-[#21252C] w-full h-fitt p-[15px] rounded-[15px] flex-col gap-8 overflow-hidden relative
                    lg:p-[15px] lg:flex-row
                    ">
                        <Image
                            src="/images/card/circle.png"
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            alt="lightning"
                            className={`absolute  w-[500px] opacity-[0.12] blur-2xl z-[0]
                            bottom-[-10vw] right-[-20vw]
                        
                            md:bottom-[-25vw] md:right-[-20vw]
                            lg:bottom-[-20vw] lg:right-[200]
                            `}
                        />
                        <div 
                        className="text w-full mt-5 lg:w-[60%] lg:px-[3rem] lg:mt-0 z-[30]">
                            <Heading index={5}/>
                        </div>
                        <div 
                            className="relative rounded-[12px] w-[100%] h-[350px] shadow-[0_0_30px_#000000]
                            lg:w-[40%] lg:h-[50vh] lg:rounded-[5px] overflow-hidden">
                            <Image
                                src='/images/blog_section/foto.jpg'
                                fill
                                priority 
                                alt="image"
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                         </div>
                    </div>
                </div>

                {/* CONTAINER 2 BOX */}
                <div
                className="
                flex flex-col-reverse gap-4
                 lg:grid lg:grid-rows-1 lg:grid-cols-2 lg:gap-8
                ">

                    {/* VIDEO */}
                    <div
                    className="
                    w-full h-fit bg-[#21252C] rounded-[15px] p-[15px] flex flex-col gap-4 relative overflow-hidden
                    ">
                        <Image
                            src="/images/card/circle.png"
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            alt="lightning"
                            className={`absolute  w-[500px] opacity-[0.12] blur-2xl z-[0]
                            bottom-[-10vw] right-[-20vw]
                        
                            md:bottom-[-25vw] md:right-[-20vw]
                            lg:bottom-[-20vw] lg:right-[200]
                            `}
                        />

                        <h2 className="text-[clamp(1rem,3vw,1.3rem)] text-white font-semibold">
                            Konten Video
                        </h2>
                        <div className="image relative aspect-video rounded-[15px]  overflow-hidden">
                        <Image
                            src='/images/blog_section/comming-soon.png'
                            fill
                            priority 
                            quality={100}
                            alt="image"
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        </div>
                        <Button name='Lihat Instagram' href='https://www.instagram.com/creativolve_' target="_blank"/><br />
                    </div>


                    {/* ARTIKEL */}
                    <div
                    className="
                    w-full h-fit bg-[#21252C] rounded-[15px] p-[15px] flex flex-col gap-4
                    ">
                        <h2 className="text-[clamp(1rem,3vw,1.3rem)] font-semibold text-white">
                            Blog Artikel
                        </h2>
                        <div className="image relative aspect-video rounded-[15px]  overflow-hidden">
                        <Image
                                src='/images/blog_section/comming-soon.png'
                                fill
                                priority 
                                quality={100}
                                alt="image"
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <Button name='Lihat Blog' href='https://www.instagram.com/creativolve_' target="_blank"/><br />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}