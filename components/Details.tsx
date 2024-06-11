import { Colors } from "@/constant/colors";
import { attendee } from "@/constant/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoDotFill } from "react-icons/go";

const getDetailsById = async (id: any) => {
  try {
    const res = await fetch(`${process.env.API_ROUTE}/api/home/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch information");
    }


    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function Details() {

  const detail = await getDetailsById('65fd545cd25c638b64ddf4b3')


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto max-w-7xl my-8 px-4 gap-4">
      <div className="">
        <Image
          unoptimized
          src={detail.home.imageUrl}
          alt=""
          width={200}
          height={100}
          className="mb-4 w-full h-[200px] rounded"
        />
        <h1 className="text-sm" style={{ color: Colors.text }}>
          {detail.home.description}
        </h1>
        <Link href={'/about'}
          style={{ color: Colors.primary }}
          className="mt-3 text-sm text-blue-950 hover:border-b-2 hover:border-blue-950 transition-all">
          Read more
        </Link>
      </div>

      <div
        style={{ borderColor: Colors.blue }}
        className="border-2 border-blue-950 rounded h-auto">
        <div
          style={{ backgroundColor: Colors.blue }}
          className="text-center py-3 bg-blue-950 text-white w-full">
          <p className="font-bold text-2xl"> Who must attend</p>
        </div>
        <div className="flex flex-col justify-center px-8 gap-4 my-4 ">
          {
            attendee.map((data) => (
              <div className="flex gap-2 items-center" key={data.id}>
                <GoDotFill
                  style={{ color: Colors.blue }}
                  className="text-blue-950 " />
                <h1 className="text-sm">{data.name}</h1>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Details;
