"use client";

import Image from "next/image";

const theList = [
    {
        number: '1',
        title: 'Fleksibel Sesuai Budget',
        paragraph: 'Kami menerapkan sistem Budget-Based Costumixation yang dimana kami menyesuaikan project dengan budget yang dimiliki.'
    },
    {
        number: '2',
        title: 'Menerapkan Sistem Konsultasi Unik',
        paragraph: 'Selain memeberikan layanan konsultasi secara teknis dan profesional, kami memberikan layanan konsultasi berbasis AI.'
    },
    {
        number: '3',
        title: 'Memberikan Solusi Digital Berbasis Big Data',
        paragraph: 'Kami memberikan solusi digital dari hasil kesimpulan riset dari sistem ‘Big Data’'
    },
]


export default function whyOur(){
    return(
        <section
        id="mengapa"
        className="
        flex flex-col items-center justify-center
        h-[150vh]
        lg:h-[130vh] lg:flex-row
        ">
            <div className="
            image w-[100vw]
            lg:w-[60%]
            ">
                <Image
                src='/images/Mengapa/why.png'
                width={450}
                height={450}
                quality={40}
                alt="Why Our"
                className="
                w-[100vw] ml-[-160px]
                lg:w-[70%] lg:m-0
                "
                />
            </div>

            <div
            className="
            text
            lg:w-[40%]
            ">
                <h2
                className="
                bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888] font-semibold text-[6.6vw]
                lg:text-[2.4vw]
                ">
                    Alasan Kenapa Harus Memilih Kami
                </h2>
                <div 
                className="
                container-list flex flex-col gap-5
                ">
                    {theList.map((item, index) => (
                        <div key={index}
                        className="
                        list flex gap-5
                        ">
                            <p
    className="
    bg-[#212121] text-white font-bold rounded-2xl text-center flex justify-center items-center
    min-w-[40px] h-[40px] text-[4vw]
    lg:min-w-[45px] lg:h-[45px] lg:text-[1vw]
    ">
    {item.number}
</p>

                            <div
                            className="
                            text flex flex-col
                            ">
                                <h4
                                className="
                                font-semibold

                                lg:text-[1.3vw]
                                ">
                                    {item.title}
                                </h4>
                                <p
                                className="
                                 text-[4vw] text-[#4E4E4E]
                                 lg:text-[1.2vw]
                                ">
                                    {item.paragraph}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}