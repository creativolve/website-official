const paragraftList = [
    'Tak perlu ragu soal biaya, kami siap membantu Anda mewujudkan solusi digital yang efektif dan tepat guna, sepenuhnya disesuaikan dengan kebutuhan dan anggaran bisnis Anda.',
  
    <>Kami akan menjadi partner bisnis anda untuk berkembang dan tampil lebih kreatif <i className='text-white'>'Tanpa Mengkhawatirkan Budget Anda'</i></>,
  
    'Kami menawarkan layanan digital yang fleksibel dan terjangkau, dengan pilihan paket yang bisa disesuaikan menurut kebutuhan dan anggaran. Solusi profesional, untuk siapa saja.'
  ];
  
  export default function Paragraft({ index }) {
    const item = paragraftList[index];
  
    return (
      <>
        <p
        className="
        text-[clamp(0.7rem,2vw,0.9rem)] text-[#b6b6b6]
        "
        >
          {item}
        </p>
      </>
    );
  }
  