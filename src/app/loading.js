import Loader from "@/components/molecules/loader/loader";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0B0B0F]">
      <Loader />
    </div>
  );
}