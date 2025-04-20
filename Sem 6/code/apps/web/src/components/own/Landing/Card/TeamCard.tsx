import { Button } from "@/components/ui/button";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  name: string;
  linkedIn: string;
  info: string;
  image: string;
}

export default function ServiceCard({
  name,
  linkedIn,
  info,
  image,
}: ServiceCardProps) {
  return (
    <div
      className={`bg-white dark:text-black flex flex-col items-start h-64 w-full py-8 px-10 rounded-[42px] border-2 border-black shadow-lg border-b-8 `}
    >
      <div className="flex flex-row w-full items-center gap-2">
        <div className=" ">
          <Image
            src={image}
            alt="team member image"
            width={30}
            height={30}
            className="w-20 h-20 p-2 bg-light_primary_background rounded-full"
          />
        </div>
        <div>
          <h1>{name}</h1>
        </div>
      </div>
      <Divider />
      <div>
        <p>{info}</p>
      </div>
    </div>
  );
}
