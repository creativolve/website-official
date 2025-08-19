export default function Paragraph({children, align,fontSize= "base"}){
    return(
        <>
        <p
        className={`
        text-${fontSize} text-${align} text-[#acacac]
        `}>
            {children}
        </p>
        </>
    )
}