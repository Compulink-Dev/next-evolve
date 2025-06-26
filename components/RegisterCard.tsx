"use";
// components/RegisterCard.tsx
import { getDominantColor } from "@/utils/getDomainColor";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface RegisterCardProps {
  name: string;
  organization: string;
  imageUrl?: string;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  name,
  organization,
  imageUrl,
}) => {
  const [bgColor, setBgColor] = useState("bg-white");

  useEffect(() => {
    if (imageUrl) {
      getDominantColor(imageUrl).then((color) => {
        setBgColor(color);
      });
    }
  }, [imageUrl]);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-lg overflow-hidden bg-blue-900">
      {/* Background image - now perfectly fitted */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/evolve-logo.png"
          alt="Background"
          fill
          style={{ objectFit: "fill" }} // Changed to "fill" to ensure full coverage
          quality={100}
          priority
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Image
            src="/white-logo.png"
            alt="Event Logo"
            width={250}
            height={250}
            className="object-fill w-[180px] h-[100px] md:[130px]"
          />
        </div>

        {/* I AM ATTENDING badge */}
        <div className="flex justify-center mb-2 md:mb-4">
          <div className="bg-yellow-400 flex items-center justify-center text-xs md:text-lg text-black md:font-bold  rounded-lg">
            <p className="px-4 py-1 text-purple-950 font-bold">
              {" "}
              I AM ATTENDING
            </p>
          </div>
        </div>

        {/* Attendee image */}
        {imageUrl && (
          <div className="flex justify-center mb-2">
            <div className="relative border-4 border-yellow-400 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-white/5"></div>{" "}
              {/* subtle matte */}
              <Image
                src={imageUrl}
                alt={`${name}'s photo`}
                height={100}
                width={100}
                className="rounded-lg object-contain w-full h-[100px] md:h-[200px]"
              />
            </div>
          </div>
        )}

        {/* Attendee details */}
        <div className="text-center ">
          <h2 className="text-md font-bold text-white ">{name}</h2>
          <p className="text-sm text-white pt-2  md:pt-4">{organization}</p>
        </div>

        {/* Footer */}
        <div className=" text-center">
          <p className="text-sm md:text-lg font-bold text-white ">
            3-4 JULY 2025
          </p>
          <p className="text-white text-xs md:text-sm mt-2 md:mt-0 md:mb-4">
            HARARE INTERNATIONAL CONFERENCE CENTRE
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
