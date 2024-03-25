import Image from "next/image";
import React, { ReactNode } from "react";
import Title from "./Title";
import { Colors } from "@/constant/colors";
import { sectors } from "@/constant/data";


function Card({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );
}

function Objectives() {
  return (
    <div>
      <div className="container mx-auto max-w-7xl my-8 flex flex-col gap-8 px-4" style={{ color: Colors.text }}>
        <Title name={'OBJECTIVES WE WANT TO ACHIEVE THROUGH EVOLVE ICT SUMMIT'} color={"text-white"} />
        <Card>
          <Image unoptimized src="/collab.jpg" width={500} height={100} alt="" className="w-full rounded shadow" />
          <div className="flex flex-col justify-center items-start" style={{ color: Colors.text }}>
            <h1
              style={{ color: Colors.primary }}
              className="font-bold text-2xl text-purple-500">COLLABORATION</h1>
            <h1 className="text-sm mt-4">
              ICT is the key that links all sectors of industry. As such Evolve
              ICT SUMMIT will bridge the digital divide across Government,
              Private Sector, diverse industry sectors and institutions
            </h1>
            <h1
              style={{ color: Colors.blue }}
              className="font-bold text-lg my-4 text-purple-500">
              IDENTIFIED INDUSTRY SECTORS AND INSTITUTIONS
            </h1>
            <ol className="px-4 text-sm list-decimal">
              {
                sectors.map((sector) => (
                  <li className="" key={sector.id}>
                    {sector.name}
                  </li>
                ))
              }

            </ol>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-bold text-2xl text-orange-400">MENTORSHIP</h1>
            <h1 className="text-sm mt-4">
              A platform through which the great minds in the ICT Industry in
              Africa and beyond can have an opportunity to mentor and impart
              knowledge to Africa’s next generation of ICT enthusiasts.
            </h1>
          </div>
          <Image unoptimized src="/mentor.jpg" width={500} height={100} alt="" className="w-full rounded shadow" />
        </Card>
        <Card>
          <Image unoptimized src="/awareness.jpg" width={500} height={100} alt="" className="w-full rounded shadow" />
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-bold text-2xl text-red-500">AWARENESS</h1>
            <h1 className="text-sm mt-4">
              The creation of a platform where relevant ICT possibilities can be
              harnessed for the advancement of the African continent.
            </h1>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-bold text-2xl text-blue-600">EXPOSURE</h1>
            <h1 className="text-sm mt-4">
              Attract the greatest minds in the ICT Industry in Africa and the
              world to show case cutting edge latest trends in the ICT industry.
            </h1>
          </div>
          <Image unoptimized src="/exposure.jpg" width={500} height={100} alt="" className="w-full rounded shadow" />
        </Card>
        <Card>
          <Image unoptimized src="/knowledge.jpg" width={500} height={100} alt="" className="w-full rounded shadow" />
          <div className="flex flex-col justify-center items-start">
            <h1
              style={{ color: Colors.primary }}
              className="font-bold text-2xl text-purple-500">KNOWLEDGE BASE</h1>
            <h1 className="text-sm mt-4">
              A centralized repository of information, resource for the
              dissemina tion of information online or with the capacity to be
              put online. This will go a long way in Africa’s knowledge
              management.
            </h1>
          </div>
        </Card>
        ``{" "}
      </div>
    </div>
  );
}

export default Objectives;
