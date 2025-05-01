import Kontak from "@/components/kontak";
import NavLayanan from "@/components/navLayanan";


export default function KontakPage() {
  return (
    <>
    <NavLayanan />
    <main 
        className="
        flex-2 px-4 py-2
        lg:px-20 lg:py-7  lg:ml-[20%] ">
            <Kontak/>
     
        </main>
    </>
  )
}