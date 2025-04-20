import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function JoiningCard() {
  return (
    <div className="flex items-center justify-center rounded-[42px] flex-row bg-light_secondary_background p-8 gap-10">
      <div className="flex flex-col items-start dark:text-black text-sm font-bold gap-10">
        <h1 className="text-lg">Let&#39;s make things happen</h1>
        <p>
          Discover how Placenext can simplify placements and unlock
          opportunities for your campus—connect with us today!
        </p>
        <Button className="bg-black text-white">Get your free proposal</Button>
      </div>
      <div className="hidden md:block">
        <Image
          src={"/assets/Landing/Joining.svg"}
          width={30}
          height={30}
          alt="joining svg"
          className="h-40 w-40 "
        />
      </div>
    </div>
  );
}
