import LandingHero from "@/assets/Hero-landing.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex-col flex gap-6 md:gap-16 md:py-10 items-center justify-between md:flex-row-reverse lg:gap-32 lg:py-28 xl:py-48 w-full">
      <h1 className="text-5xl md:hidden">Shape Your Future with Placenext</h1>
      <Image
        src="/assets/Hero_landing.svg"
        alt="Logo"
        width={30}
        height={30}
        className="h-72 w-72 xl:h-96 xl:w-96"
      />
      <div className="flex flex-col  gap-6 lg:gap-20 lg:max-w-screen-sm">
        <h1 className="text-5xl hidden md:block">
          Shape Your Future with Placenext
        </h1>
        <p className="text-sm">
          Our App streamlines the placement process for colleges, companies, and
          students, offering efficient tools to ensure a smooth and hassle-free
          experience for everyone involved.
        </p>
        <Button className=" bg-light_primary_background text-md">
          Get Started
        </Button>
      </div>
    </div>
  );
}
