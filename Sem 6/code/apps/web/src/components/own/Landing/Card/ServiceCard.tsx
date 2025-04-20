import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  bgColor: string; // Tailwind class for background color
  text: React.ReactNode; // Card title text (string or JSX)
  image: string; // Image source
  link: string; // Link URL
}

export default function ServiceCard({
  bgColor,
  text,
  image,
  link,
}: ServiceCardProps) {
  return (
    <div
      className={`${bgColor} flex flex-col items-start h-64 w-full py-8 px-10 rounded-[42px] border-2 border-black shadow-lg border-b-8`}
    >
      {/* Title */}
      <h2
        className={`text-lg  font-semibold text-center ${bgColor === "bg-dark_bg_card" || bgColor === "bg-light_primary_background" ? "text-black dark:text-black" : "text-black"}`}
      >
        {text}
      </h2>

      {/* Button and Image */}
      <div className="w-full flex justify-between relative p-4 h-full">
        {/* Button */}
        <Link href={link} passHref>
          <Button
            className="flex items-center absolute gap-2 bottom-0 left-0"
            aria-label="Explore more"
          >
            <Image
              src={"/assets/Expore_more.svg"}
              width={20}
              height={20}
              alt="Explore more"
              className={`h-8 w-8 ${bgColor === "bg-dark_bg_card" ? "bg-white text-black" : "bg-black"}`}
            />
          </Button>
        </Link>

        {/* Image */}
        <Image
          src={image}
          width={72}
          height={72}
          alt="Card Image"
          className={`rounded-md h-32 w-32 absolute top-0 right-0 fill-current ${
            bgColor === "bg-dark_bg_card" ? "text-white bg-white" : "text-black"
          }`}
        />
      </div>
    </div>
  );
}
