"use client";



import Footer from '@/components/footer';
import '@/css/typografi.css'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';



export default function TentangPage() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() =>{
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return(
        <>
        <Image
        src="/images/blog/background.png"
        alt='bg'
        width={300}
        height={300}
        className='
        w-full absolute object-cover z-[-30] h-[50vh] top-[-20px] opacity-[0.2] pointer-events-none select-none
        lg:h-[90vh] lg:opacity-[0.04] 
        '/>
        <nav
        className='
        w-fit pt-[60px] px-[50px]
        '>
            <div
            className='
            flex gap-5 items-center w-fit
            '>
                <Link 
                href="/"
                className={`
                rounded-full px-5 py-2 transition-all duration-200 ease-in-out flex gap-5 text-white justify-center items-center
                bg-[#262626]
                
                hover:shadow-md hover:bg-[#cfcfcf] hover:text-black group
                active:shadow-md active:bg-[#cfcfcf] active:text-black

                ${scrolled? 'fixed ' : ''}
                `}>
                    <Image
                    src="/images/Back Button.png"
                    alt="kembali"
                    width={100}
                    height={100}
                    className='
                    w-[8vw] transition-all duration-200 ease-in-out
                    lg:w-[2vw] object-cover select-none cursor-pointer invert
                    group-hover:invert-0
                    '
                    />
                    Kembali
                </Link>
            </div>
        </nav>
        <header
        className='
        h-[50vh] flex justify-center items-center
        lg:h-[100vh]
        '
        >
            <h1
            className='
            font-bold text-[8vw] leading-[9vw] text-center bg-gradient-to-r bg-clip-text text-transparent from-[#000000] to-[#888888]
            md:text-[7vw] md:leading-[7.1vw]
            lg:text-[3.3vw] lg:leading-[3.7vw] 
            '
            >
                Creativolve Agency <br />
                Solusi Digital Kreatif
            </h1>
        </header>
        <main
        className="
        m-auto pb-40 px-[50px]
        md:px-[15vw]
        lg:px-0

        prose prose-2xl prose-headings:text-[4.6vw] prose-h2:text-[5.4vw] prose-h1:text-[6.8vw]  prose-p:text-[4.3vw] prose-li:text-[4.3vw] prose-ol:text-[3vw] [&_ol]:pl-1 [&_ul]:pl-4

        md:prose-headings:text-[3.6vw]  md:prose-h2:text-[4vw] md:prose-h1:text-[5vw] md:prose-p:text-[2vw]md:prose-li:text-[2vw] md:prose-ol:text-[2vw]
              
        lg:prose-headings:text-[1.5vw] lg:prose-h2:text-[1.6vw] lg:prose-h1:text-[2vw] lg:prose-p:text-[1.2vw] lg:prose-li:text-[1.2vw] lg:prose-ol:text-[1.2vw]
        ">
            <h1>Tentang Creativolve Agency</h1>
            <p>
            Creativolve Agency adalah sebuah agency full-service yang hadir sebagai solusi inovatif untuk menjawab kebutuhan digital branding dan strategi bisnis masa kini. Dengan menjadikan Digital Branding dan Strategy Branding sebagai role model utama, kami berkomitmen untuk menjadi mitra strategis yang mendorong evolusi dan pertumbuhan bisnis melalui pendekatan kreatif, kolaboratif, dan berbasis teknologi digital.
            </p>
            <p>
            Kami percaya bahwa setiap bisnis, terlepas dari besar atau kecilnya, memiliki potensi besar untuk tumbuh. Oleh karena itu, kami menghadirkan pendekatan unik yang kami sebut sebagai
             <i className='text-black'> 
                 Budget-Based Customization
            </i>—di mana kami menyesuaikan strategi dan performa layanan kami berdasarkan anggaran yang dimiliki klien, tanpa mengurangi kualitas dan profesionalitas. Dengan sistem ini, klien tak perlu khawatir soal biaya karena kami akan merancang solusi yang optimal sesuai kemampuan mereka.
            </p>

            <div
            className='
            bg-[#262626] px-5 py-8 rounded-xl my-20 shadow-lg shadow-500/50
            '>
                <h2 className='text-white'>Visi Dan Misi Kami!</h2>
                <p className='text-[#c2c2c2]'>
                    <strong className='text-white'>Visi :</strong><br /> Menjadi pusat solusi bisnis inovatif yang berpusat pada kreatyif digital untuk mendorong evolusi dan pertumbuhan bisnis.
                </p>

                <ol className='list-decimal list-inside text-[#c2c2c2] marker:text-white'>
                    <strong className='text-white'>Misi :</strong><br />
                    <li>Memberikan pelayanan digital dengan pemanfaatan automation secara profesional dan inovatif.</li>
                    <li>Membantu bisnis berkembang dengan solusi branding dan digital yang efektif.</li>
                    <li>Mengeksplorasi dan mengangkat keunikan sebuah brand untuk membentuk identitas visual yang menarik serta bermakna dan autentik.</li>
                    <li>Mewujudkan komunitas bisnis berbasis digital branding yang mendukung pertumbuhan bisnis melalui strategi inovatif dan kolaboratif.</li>
                    <li>Mendorong adopsi teknologi dalam strategi pemasaran dan branding.</li>
                    <li>Membangun platform digital yang mendukung pertumbuhan bisnis secara berkelanjutan.</li>
                    <li>Memberikan edukasi digital branding serta strategi bisnis modern.</li>
                </ol>
            </div>

            <h2>Layanan Kami</h2>
            <p>Sebagai agency dengan pendekatan menyeluruh, layanan kami dirancang dalam empat cakupan utama:</p>
            <ul>
                <li>
                    <strong>Digital Branding dan Strategy (Role Model Utama)
                    </strong>
                    <p>
                    Membentuk identitas brand yang kuat, otentik, dan relevan untuk pasar digital.
                    </p>
                </li>
                <li>
                    <strong>Digital Marketing</strong>
                    <p>
                    Menjangkau audiens yang tepat dengan strategi kampanye digital yang terukur.
                    </p>
                </li>
                <li>
                    <strong>Desain dan Editing</strong>
                    <p>
                    Layanan desain visual dan editing konten yang tersedia juga secara satuan untuk kebutuhan umum.
                    </p>
                </li>
                <li>
                    <strong>Pengembangan Website</strong>
                    <p>
                    Membangun situs web profesional yang responsif, cepat, dan fungsional, serta mencerminkan identitas brand secara optimal.
                    </p>
                </li>
                <li>
                    <strong>Search Engine Optimization (SEO)</strong>
                    <p>
                    Mengoptimalkan visibilitas website di mesin pencari untuk meningkatkan traffic organik dan memperkuat kehadiran digital secara berkelanjutan.
                    </p>
                </li>
            </ul>

            <p>
            Melalui pendekatan kolaboratif, inovatif, dan berfokus pada solusi yang terjangkau namun berdampak, Creativolve Agency hadir bukan sekadar sebagai penyedia jasa, tapi sebagai mitra pertumbuhan jangka panjang bagi bisnis Anda.
            </p>

        </main>
        <Footer/>
        </>
    )
}