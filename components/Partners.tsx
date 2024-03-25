import Image from "next/image";
import React from "react";

function Partners({ title, image }: any) {
  return (
    <div className="border-2 h-48 border-purple-800 rounded-md flex justify-center items-center hover:shadow-lg hover:cursor-pointer">
      <Image src={image} alt="" width={500} height={500} />
    </div>
  );
}

export default Partners;
