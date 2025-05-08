import Image from "next/image";
import React from "react";
import Title from "./NewTitle";

interface Partner {
  name: string;
  role: string;
  image: string;
}

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <div className="text-slate-400 flex flex-col w-36 items-center justify-center">
      <div className="bg-purple-200 h-36 w-36 rounded-3xl flex items-center justify-center">
        <Image
          src={partner.image}
          alt={partner.name}
          className="object-contain w-full h-full"
          width={100}
          height={100}
        />
      </div>
      <div className="text-center">
        <p className="my-3">{partner.name}</p>
        <p>{partner.role}</p>
      </div>
    </div>
  );
};

function GeneralPartners() {
  // Replace with dynamic partner data
  const partners: Partner[] = [
    // Example partner object
    // {
    //     name: "Compulink",
    //     role: "Partner",
    //     image: "/compulink.png"
    // }
  ];

  return (
    <div className="bg-purple-950">
      <Title title="Partners who" subtitle="collaborate with us" />
      {partners.length > 0 ? (
        <div className="p-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          {partners.map((partner, index) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-300 py-12">
          <p className="text-2xl font-bold">
            No partners available at this time
          </p>
        </div>
      )}
    </div>
  );
}

export default GeneralPartners;
