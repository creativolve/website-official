import Link from "next/link"



export default function Kontak(){

    const list = [
        {
            name: 'Email Agency',
            Desk: 'Kirimkan laporan Anda ke alamat email resmi kami, dan tim kami akan segera merespons untuk memberikan solusi',
            link: 'mailto:creativolve.agency@gmail.com'
        },
        {
            name: 'Whatsapp Founder',
            Desk: 'Anda juga dapat menghubungi Founder langsung melalui WhatsApp untuk mendapatkan bantuan lebih cepat.mkan laporan Anda ke alamat email resmi kami, dan tim kami akan segera merespons untuk memberikan solusi',
            link: 'https://wa.me/6288289158984'
        },
        {
            name: 'Instagram',
            Desk: 'Kami juga aktif di Instagram, jadi Anda bisa mengirimkan pesan langsung melalui akun kami untuk mendapatkan bantuan lebih lanjut.',
            link: 'https://instagram.com/creativolve_'
        },
    ]

    return(
        <div
        className="
        flex flex-col gap-6 py-25 px-7
        ">
        <div className="heading">
            <h2
            className="
            font-semibold text-white
            text-[6.6vw]
            md:text-[5vw]
            lg:text-[2.4vw]
            ">
                Kontak Keluhan
            </h2>
        </div>
        <p
        className="
        text-[4vw] text-[#cccccc]
        md:text-[3.4vw]
        lg:text-[1.2vw]
        ">
        Untuk melaporkan bug atau masalah teknis terkait platform website, Asisten Digital AI, atau keluhan lainnya, Anda dapat menghubungi kami melalui fitur Kontak. Kami memahami pentingnya pengalaman pengguna yang lancar dan siap untuk segera menanggapi setiap kendala yang Anda temui.
        </p>
        <p
        className="
        text-[4vw] text-[#cccccc]
        md:text-[3.4vw]
        lg:text-[1.2vw]
        ">
        Anda dapat menghubungi kami melalui beberapa saluran komunikasi yang tersedia:
        </p>
        <ol className="list-decimal pl-5 space-y-2 flex flex-col gap-6">
            {list.map((item, index) =>(
                <li 
                key={index}
                className="
                text-[4vw] text-[#cccccc]
                md:text-[3.4vw]
                lg:text-[1.2vw]
                "
                >
                    <strong>{item.name}</strong>
                    {item.Desk} 
                     <Link href={item.link} 
                    className="
                    text-blue-300
                    "
                    >
                         {item.name}
                    </Link>
                </li>
            ))}
        </ol>
        <p
        className="
        text-[4vw] text-[#cccccc]
        md:text-[3.4vw]
        lg:text-[1.2vw]
        ">
            Kami berkomitmen untuk menanggapi setiap keluhan dengan serius dan segera mencari solusi agar pengalaman Anda tetap optimal.
        </p>
        </div>
    )
}