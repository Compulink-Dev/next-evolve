// components/RegisterCard.tsx
import Image from "next/image";
import React from "react";

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
            className="object-contain"
          />
        </div>

        {/* I AM ATTENDING badge */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg">
            I AM ATTENDING
          </div>
        </div>

        {/* Attendee image */}
        {imageUrl && (
          <div className="flex justify-center mb-2">
            <div className="relative w-36 h-36 border-4 border-yellow-400 rounded-lg bg-white p-1">
              <Image
                src={imageUrl}
                alt={`${name}'s photo`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        )}

        {/* Attendee details */}
        <div className="text-center ">
          <h2 className="text-md font-bold text-white ">{name}</h2>
          <p className="text-sm text-white border-t border-white/30 pt-4">
            {organization}
          </p>
        </div>

        {/* Footer */}
        <div className=" text-center">
          <p className="text-lg font-bold text-white ">3-4 JULY 2025</p>
          <p className="text-white text-sm mb-4">
            HARARE INTERNATIONAL CONFERENCE CENTRE
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
