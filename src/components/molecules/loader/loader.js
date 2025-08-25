import ShinyText from "@/components/atoms/animation/shinnyText";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg font-medium animate-pulse">
        <ShinyText
        text="Halaman Sedang Dimuat!" disabled={false} speed={2}
        />
      </div>
    </div>
  );
}
