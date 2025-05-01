
export default function Beranda(){

    const paragraft = [
        {
            paragraft: 'Anda bisa menggunakan Pusat Bantuan ini untuk mengakses berbagai layanan kami dengan lebih mudah dan efisien. Pusat ini dirancang sebagai tempat terpusat untuk menjawab kebutuhan Anda dalam menggunakan layanan kami secara maksimal.'
        },
        {
            paragraft: 'Di dalamnya, tersedia beberapa fitur penting seperti Asisten Digital Berbasis AI yang siap membantu Anda selama 24 jam, memberikan panduan, jawaban cepat, dan solusi awal atas berbagai pertanyaan. Anda juga bisa langsung menghubungi tim kami melalui fitur Kontak, jika memerlukan bantuan secara langsung.'
        },
        {
            paragraft: 'Selain itu, kami menyediakan fitur Ajukan Diskusi untuk Anda yang ingin berkonsultasi atau berdiskusi lebih dalam mengenai strategi dan kebutuhan bisnis. Bagi Anda yang sudah siap memulai kerja sama, tersedia juga Form Pengajuan Project yang bisa Anda isi untuk kami tindak lanjuti secara profesional.'
        },
    ]

    return(
        <>
        <div 
        className="
        text-white flex flex-col gap-6
        "
        >
            <div className="heading">                
                <h2
                className="
                font-semibold
                text-[6.6vw]
                md:text-[5vw]
                lg:text-[2.4vw]
                ">
                    Selamat Datang Di Pusat Layanan Creativolve Agency
                </h2>
            </div>
        {paragraft.map((item, index) => (
            <p
            key={index}
            className="
            text-[4vw] text-[#cccccc]
            md:text-[3.4vw]
            lg:text-[1.2vw]
            "
            >
                {item.paragraft}
            </p>
        ))}
        </div>
        </>
    )
}