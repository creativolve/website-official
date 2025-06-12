import Heading from "./heading"
import Paragraft from "./paragraft"
import Button from "./button"
import SocialMedia from "./iconSocial"
import Image from "next/image"




export default function Hero() {

    return(
        <>
            <section className="heroSection w-full h-[110vh] lg:h-[120vh]">
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
            </section>
        </>
    )
}