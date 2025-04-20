import useLoadingStore from "@/store/loadingStore";
import Image from "next/image";

export default function Loading() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null; // Hide the component when not loading

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Image
          src={"/bouncing-circles.svg"}
          alt="Loading"
          width={100}
          height={100}
        />
        <p className="mt-4 text-white text-lg">Loading, please wait...</p>
      </div>
    </div>
  );
}
