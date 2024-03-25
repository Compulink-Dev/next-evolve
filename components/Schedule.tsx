import Image from "next/image";
import React from "react";
import Title from "./Title";
import Link from "next/link";
import { Colors } from "@/constant/colors";

const Event = ({ time, title }: any) => {
  return (
    <div className="flex gap-4 justify-between mt-2">
      <div className="space-y-4">
        <h1 className="text-sm text-gray-500">{time}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-sm text-gray-500">{title}</h1>
      </div>
    </div>
  )
}

function Schedule() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 container mx-auto max-w-7xl my-8 gap-8 px-4">
      <div className="">
        <Title color={Colors.primary} name={'Event Schedule'} />
        <div>
          <h1 className="font-bold text-2xl mt-8" style={{ color: Colors.primary }}>Date</h1>
          <Event time={'8:00 - 8:30'} title={'Arrival and Registration'} />
          <Event time={'15:30 – 16:00'} title={'Discussion (Blend Moderator & Q&A)'} />
          <Link href={'/event'}
            style={{ color: Colors.primary }}
            className="text-sm text-purple-500 flex items-center justify-end mt-4 hover:text-blue-500">View Full Schedule</Link>
          <div
            style={{ backgroundColor: Colors.secondary }}
            className="h-1 w-full bg-purple-200 mt-1 rounded" />
        </div>
        <div>
          <h1 className="font-bold text-2xl mt-8" style={{ color: Colors.primary }}>Date</h1>
          <Event time={'8:00 - 8:30'} title={'Arrival and Registration'} />
          <Event time={'15:30 – 16:00'} title={'Cocktail and Exhibition Stands views – Simple Entertainment.'} />
          <Link href={'/event'}
            style={{ color: Colors.primary }}
            className="text-sm text-purple-500 flex items-center justify-end mt-4 hover:text-blue-500">View Full Schedule</Link>
          <div
            style={{ backgroundColor: Colors.secondary }}
            className="h-1 w-full bg-purple-600 mt-1 rounded-md"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-start">
        <h1 className="font-bold text-lg" style={{ color: Colors.primary }} >
          IMPLEMENTATION OF EVOLVE ICT SUMMIT
        </h1>
        <Image unoptimized alt="" src="/home4.jpg" width={1000} height={300} className="rounded" />
      </div>
    </div>
  );
}

export default Schedule;
