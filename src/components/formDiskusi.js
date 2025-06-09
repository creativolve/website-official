import "@/css/effect.css"
import InputFloating from "@/components/inputForm";
import Image from "next/image";

export default function FormDiskusi(){

    return(
        <div
        className="
        flex justify-between flex-col h-full overflow-auto
        lg:flex-row
        ">
<div className="explain flex-1 w-auto p-10 min-h-[500px] flex flex-col gap-6 lg:gap-24 overflow-hidden relative lg:w-[40%] lg:h-full lg:px-17 lg:py-15 bg-[#101113] rounded-2xl">

            <Image
            src='/images/form/circle.png'
            width={650}
            height={650}
            alt="Circle-background"
            className="absolute w-[400px] bottom-[-90px] left-[-80px] lg:bottom-[-190] lg:left-[-130]"
            />
                <Image
                src='/images/logo.png'
                width={700}
                height={700}
                alt="logo"
                className="w-[clamp(6rem,12vw,16rem)]"
                />
                <div className="text z-1">
                    <h2
                    className="
                     text-[clamp(1.3rem,1.7vw,1.7rem)] font-bold
                    ">
                        Pengajuan Diskusi
                    </h2>
                    <p
                    className="
                    text-[clamp(0.8rem,1.1vw,0.9rem)]
                    ">
                    Silahkan mengisi form ini untuk mengajukan diskusi pada tim kami, dengan rancangan brief yang dibantu oleh Asisten Digital Form kami!
                    </p>
                </div>
            </div>
            <div className="form w-full lg:w-[60%] h-full lg:overflow-auto scrollbar-hide no-scrollbar">

                <form
                method="POST"
                className="w-full px-4 py-20 lg:px-20 lg:py-10 flex flex-col gap-10 max-w-2xl space-y-6 z-[0]"
                >

                        <InputFloating
                        id="nama"
                        label="Nama"
                        type="text"
                        name="name"
                        />
                        <InputFloating
                            id="Email"
                            label="Email"
                            type="email"
                            name="email"
                        />
                        <InputFloating
                            id="number"
                            label="No Whatsapp"
                            type="number"
                            name="phone"
                        />
        <div className="bg-[#17181A] rounded-2xl px-[20px] py-[30px] h-fit">

            <div className="flex gap-6 lg:items-center flex-col lg:justify-between lg:flex-row">
                  <div className="text w-[70%]">
                    <h1 className="font-semibold text-[clamp(1rem,1.3vw,2rem)]">
                      Buat Brief
                    </h1>
                    <p className="font-regular text-[clamp(0.7rem,0.9vw,0.9rem)]">
                      Kami akan mengarahkan anda untuk membuat brief yang
                      terstruktur
                    </p>
                    <br />
                    <span className="text-red-600 text-[2vw] md:text-[2vw] lg:text-[1vw]">
                    
                    </span>
                  </div>
                  <button
                    type="button"
                    className="rounded-3xl min-w-[100px] px-2 py-[5px] text-sm cursor-pointer border-transparent shadow-[0_0_15px_#00E5FF]  transition ease-in-out background-gradient text-black

                    hover:translate-y-[-5px] hover:shadow-[#00E5FF] hover:shadow-lg
                    "
                  >
                    Buat brief!
                  </button>
                </div>
        </div>

        <button
            type="submit"
            className={`
              border-transparent shadow-[0_0_15px_#00E5FF] background-gradient text-black
              px-4 py-2 rounded-full transition ease-in-out
              
              hover:translate-y-[-5px] hover:shadow-[#00E5FF] hover:shadow-lg`}
          >
              Ajukan
          </button>
            </form>
            </div>

        </div>
    )
}