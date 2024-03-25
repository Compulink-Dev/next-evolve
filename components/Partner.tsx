'use client'
import React, { CSSProperties, useState } from "react";
import Image from "next/image";
import mutual from '../public/home/old-mutual-logo.png'
import PulseLoader from "react-spinners/PulseLoader";
import Title from "./Title";
import { Colors } from "@/constant/colors";




function Partner({ title, image }: any) {
  return (
    <div className="border-2 h-48 border-purple-800 rounded-md flex justify-center items-center hover:shadow-lg hover:cursor-pointer">
      <Image unoptimized src={mutual} alt="" width={500} height={500} />
    </div>
  );
}

function Partners() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div
      style={{ backgroundColor: Colors.bgColor, color: Colors.primary }}
      className="bg-purple-100 p-8 -mt-12">
      <div className="container mx-auto max-w-7xl">
        <Title name={'Event Partner'} color={Colors.primary} />


        <div className="flex flex-col items-center justify-center my-20">
          <p
            style={{ color: Colors.primary }}
            className="mb-4 text-lg text-purple-900">Partners are loading soon</p>
          <PulseLoader
            color={Colors.primary}
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>

        {/* <div className="container w-full  mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
                            {
                                partners.map((partner) => (
                                    <Partner key={partner} />
                                ))
                            }
                        </div> */}


      </div>
    </div>
  );
}

export default Partners;
