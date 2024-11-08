import Loader from "@/components/ui/Loader";

export default function LoadingDefault() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader size={32} />
    </div>
  );
}
