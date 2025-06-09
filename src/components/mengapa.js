import { list } from "postcss"
import Heading from "./heading"


const listAlasan = [
    {
        title: 'Fleksibel Sesuai Budget',
        paragraft: 'Kami menerapkan sistem Budget-Based Costumization yang dimana kami menyesuaikan project dengan budget yang dimiliki.'
    },
    {
        title: 'Layanan Lengkap dalam Satu Atap',
        paragraft: 'Kami menyediakan layanan digital secara menyeluruh mulai dari branding, digital marketing, desain konten, hingga pengembangan website dan SEO dalam satu ekosistem yang terintegrasi.'
    },
    {
        title: 'Pendekatan Kolaboratif dan Inovatif',
        paragraft: 'Kami mengutamakan kolaborasi dan inovasi dalam setiap proses kerja. Lebih dari sekadar vendor, kami akan berperan sebagai partner dalam perjalanan bisnis Anda dan berkembang bersama'
    },
    {
        title: 'Solusi Digital yang Skalabel',
        paragraft: 'Kami membangun solusi digital yang skalabel dan siap mengikuti perkembangan teknologi, sehingga bisnis Anda bisa terus bertumbuh dan relevan di era digital yang terus berubah.'
    },
    {
        title: 'Pelayanan Efektif Dan Efisien Dengan Teknologi',
        paragraft: 'Kami membangun dan terus mengembangkan pelayanan berbasis digital dan teknologi sehingga pelayanan yang kami berikan bisa lebih efektif dan efisien'
    },
]



export default function Mengapa(){

    return(
        <>
        <div id="mengapa"
        className="
        h-[150vh] w-full flex items-center 
        lg:h-[120vh]
        ">
            <div
            className="
            content flex flex-col gap-30 justify-center items-center
            lg:flex-row
            ">
                <div className="text lg:w-[40%]">
                    <Heading index={3}/>
                </div>
                <div className="dropdown lg:w-[40%]">
                    <div className="join join-vertical rounded-[20px] bg-[#21252C] shadow-[0_0_40px_#00E5FF50] stroke-none border-none">
                            {listAlasan.map((item, index) => (
                            <div key={index}    
                            className={`
                                collapse collapse-arrow join-item border border-base-300
                                ${index === 0 
                                    ? "rounded-t-[20px]" 
                                    : ""}
                                ${
                                    index === listAlasan.length - 1 
                                    ? "rounded-b-[20px]" 
                                    : ""}
                              `}>
                                <input type="radio" name="my-accordion-4" defaultChecked={index === 0} />
                                <h2 className="collapse-title font-semibold">
                                    {item.title}
                                </h2>
                                <p className="collapse-content text-sm text-[#b6b6b6]">
                                    {item.paragraft}
                                </p>
                            </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}