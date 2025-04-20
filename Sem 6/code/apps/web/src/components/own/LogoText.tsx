"use client";
import Image from "next/image";

import Link from "next/link";

const LogoText = () => {
  return (
    <Link href={"/"}>
      <div className="flex flex-row items-center gap-2 p-2">
        <div>
          <Image
            src="/assets/PlaceNext_logo.png"
            alt="Logo"
            width={34}
            height={34}
            className="h-auto w-auto lg:h-12 lg:w-12"
          />
        </div>
        <div>
          <h1 className="text-lg text-justify text-black lg:text-lg xl:text-xl 2xl:text-3xl font-semibold dark:text-white">
            Place<span className="font-extrabold">Next</span>
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default LogoText;
