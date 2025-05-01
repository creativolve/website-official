import ChatAI from "@/components/chatAI";
import NavLayanan from "@/components/navLayanan";


export default function ChatPage() {
  return (
    <>
        <NavLayanan/>
    <main 
        className="
        flex-2 px-4 py-2
        lg:px-20 lg:py-7  lg:ml-[20%] ">
            <ChatAI/>
     
        </main>
    </>
  )
}