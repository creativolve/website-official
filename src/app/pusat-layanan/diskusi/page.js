import Diskusi from "@/components/ajukanDiskusi";
import NavLayanan from "@/components/navLayanan";


export default function DiskusiPage() {
  return (
    <>
    <NavLayanan/>
    <main 
        className="
        flex-2 px-4 py-2
        lg:px-20 lg:py-7  lg:ml-[20%] ">
            <Diskusi/>
     
        </main>
    </>
  )
}