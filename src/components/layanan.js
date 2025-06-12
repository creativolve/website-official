import Button from "./button"
import Heading from "./heading"
import Paragraft from "./paragraft"
import Card from "./card"

export default function Layanan(){

    return(
        <>
        <section 
        id="layanan"
        className="
        w-full h-[180vh] flex items-center
        lg:h-[120vh]
        ">
            <div className="content flex justify-center m-auto lg:items-center flex-col-reverse gap-15
            lg:flex-row
            ">
                <div className="teks  flex flex-col gap-6 
                lg:p-15 lg:w-[50%]
                ">
                    <Heading index={2}/>
                    <Paragraft index={2}/>
                    <Button name="Lengkapnya!" href='/layanan'/>
                </div>
                <div 
                className="
                container-card grid grid-cols-2 grid-rows-2 gap-3
                lg:gap-x-10 lg:gap-y-5
                ">
                    <Card index={4}/>
                    <Card index={5}/>
                    <Card index={6}/>
                    <Card index={7}/>
                </div>
            </div>
        </section>
        </>
    )
}