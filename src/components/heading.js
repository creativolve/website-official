

import "@/css/effect.css"



const headingList = [
    {
      section: 'HERO',
      beforeSpan: 'Kreatifitas Berbasis ',
      span: 'Inovasi Digital & Teknologi.',
      afterSpan: ''
    },
    {
      section: 'TENTANG',
      beforeSpan: 'Solusi Kreatif dan Inovatif untuk ',
      span: 'Kebutuhan Digital di Era Modern.',
      afterSpan: ''
    },
    {
      section: 'LAYANAN',
      beforeSpan: 'Solusi Digital Terintegrasi ',
      span: 'untuk Setiap Kalangan.',
      afterSpan: ''
    },
    {
      section: 'LAYANAN',
      beforeSpan: 'Kami adalah ',
      span: 'Pilihan Terbaik',
      afterSpan: ' untuk Kebutuhan Digital Anda'
    },
    {
      section: '',
      beforeSpan: '',
      span: 'Pusat Layanan Digital dengan Dukungan AI',
      afterSpan: ' untuk Layanan yang Lebih Cepat dan Akurat'
    },
    {
      section: '',
      beforeSpan: 'Kami hadir bukan sekadar menyelesaikan proyek Anda',
      span: ' tapi untuk menjadi solusi jangka panjang',
      afterSpan: ' bagi kebutuhan digital Anda.'
    },
    {
      section: 'blog',
      beforeSpan: '',
      span: ' Salah satu Agensi Pertama Yang Menerapkan Kecerdasan Buatan (AI)',
      afterSpan: ' Pada Sistem Asisten Digitalnya Di Bogor, Yang Membuat Pelayanannya Tampil Elegan.'
    },
    {
      section: '',
      beforeSpan: 'Pusat Layanan yang dilengkapi ',
      span: ' teknologi AI',
      afterSpan: ''
    },
        {
      section: '',
      beforeSpan: 'Tanyakan apapun kepada ',
      span: ' Asisten Digital Creativolve',
      afterSpan: '✨'
    },
  ];

  
export default function Heading({index, paragraft = 'left'}) {
    const item = headingList[index];
    const isSubHeading = index === 5 || index === 6 || index === 8;

    if (!item) return null;

    
    return(
        <>
        <h2
        className={`
        font-semibold text-white text-${paragraft}
        ${isSubHeading 
          ? 'text-[clamp(1.2rem,2vw,1.5rem)] leading-[clamp(1.4rem,3vw,2.4rem)] text-shadow-[0_0_20px_#00E5FF]' 
          : 'text-[clamp(2rem,5vw,2.5rem)] leading-[clamp(2.2rem,5.2vw,2.5rem)] heading-shadow'}
        `}>
            {item.beforeSpan}
            <span
            className="
            text-gradient
            ">
                {item.span}
            </span>
            {item.afterSpan}
        </h2>
        </>
    )
}