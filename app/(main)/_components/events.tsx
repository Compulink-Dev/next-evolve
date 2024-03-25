import Image from "next/image";
import React from "react";
import Link from "next/link";
import Title from "@/components/Title";
import { Color } from "@/constant/colors";
// import { firstDay, secondDay } from "@/constant/data";

const Event = ({ time, title }: { time: string, title: string }) => {
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

function Events() {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 container mx-auto max-w-7xl my-8 gap-8 px-4">
            <div className="">
                <Title title={'Event Schedule'} color="text-purple-600" />
                <div>
                    <h1 className="font-bold text-2xl mt-8" style={{ color: Color.colorBg }}>Day 01</h1>
                    {/* <Event time={firstDay[0].time} title={firstDay[0].title} />
                    <Event time={firstDay[10].time} title={firstDay[10].title} /> */}
                    <Link href={'/event'} className="text-sm text-purple-500 flex items-center justify-end mt-4 hover:text-purple-200">View Full Schedule</Link>
                    <div className="h-1 w-full bg-purple-200 mt-1 rounded" />
                </div>
                <div>
                    <h1 className="font-bold text-2xl mt-8" style={{ color: Color.colorBg }}>Day 02</h1>
                    {/* <Event time={secondDay[0].time} title={secondDay[0].title} />
                    <Event time={secondDay[12].time} title={secondDay[12].title} /> */}
                    <Link href={'/event'} className="text-sm text-purple-500 flex items-center justify-end mt-4 hover:text-purple-200">View Full Schedule</Link>
                    <div className="h-1 w-full bg-purple-600 mt-1 rounded-md"></div>
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-start">
                <h1 className="font-bold text-lg" style={{ color: Color.colorBg }} >
                    IMPLEMENTATION OF EVOLVE ICT SUMMIT
                </h1>
                <Image unoptimized alt="" src="/home/comp2.png" width={1000} height={500} />
            </div>
        </div>
    );
}

export default Events;
