import React from "react";
import Title from "./Title";
import { Colors } from "@/constant/colors";

const getIntroById = async (id: any) => {
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


async function Introduction() {

  const info = await getIntroById('65fd53a4d25c638b64ddf4ab')
  const info2 = await getIntroById('65fd53f9d25c638b64ddf4b1')


  return (
    <div className="container mx-auto max-w-7xl my-8 md:my-14 px-4">
      <Title color={Colors.blue} name={'INTRODUCTION'} />
      <div className="grid grid-col-1 md:grid-cols-3 gap-4">
        <div className="">
          <h1 className="font-bold mb-2" style={{ color: Colors.text }}>{info.home.title}</h1>
          <h1 className="text-sm" style={{ color: Colors.text }}>
            {info.home.description}
          </h1>
          {/* <div className="h-24 w-1 bg-black"></div> */}
        </div>

        <div className="col-span-2">
          <div className="h-auto">
            <h1 className="font-bold mb-2" style={{ color: Colors.text }}>{info2.home.title}</h1>
            <h1 className="text-sm" style={{ color: Colors.text }}>
              {info2.home.description}
            </h1>
          </div>
          {/* <div className="h-12 w-1 bg-black"></div> */}
        </div>
      </div>
    </div >
  );
}

export default Introduction;
