import { Colors } from '@/constant/colors';
import { attendee } from '@/constant/data';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { GoDotFill } from "react-icons/go";

function Summit() {
    return (
        <div className='m-8'>
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1">
                    <div className="h-[200px] mb-4  w-full relative">
                        <Image unoptimized src={'/home/comp2.png'} alt='' fill className='rounded' />
                    </div>
                    <h1 className="text-sm" style={{ color: Colors.text }}>
                        {/* {home[2].paragraph} */}
                    </h1>
                    <div className="mt-4"></div>
                    <Link href={'/about'} className='text-sm text-purple-600 hover:text-purple-400 p-3 rounded border border-purple-600 hover:border-purple-400'>Read More</Link>
                </div>


                <div className="flex-1">
                    <div className="border-2 border-purple-600 rounded h-auto">
                        <div className="text-center py-3 bg-purple-600 text-white w-full">
                            <p className="font-bold text-2xl"> Who must attend</p>
                        </div>
                        <div className="flex flex-col justify-center px-8 gap-4 my-4 ">
                            {
                                attendee.map((data) => (
                                    <div className="flex gap-2 items-center" key={data.id}>
                                        <GoDotFill className="text-purple-500 " />
                                        <h1 className="text-sm">{data.name}</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summit