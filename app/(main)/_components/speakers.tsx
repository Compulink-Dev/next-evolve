'use client'
import Link from 'next/link'
import React from 'react'
import { MdPerson } from 'react-icons/md'
import { useState, CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Title from '@/components/Title';
import Subtitle from '@/components/subtitle';
import { Button } from '@/components/ui/button';
import { Colors } from '@/constant/colors';
import { speakers } from '@/constant/data';


const Speaker = () => {
    return (
        <div className="mx-8 flex justify-between">
            <div className="border border-white w-full h-[400px] rounded text-white">
                <div className="h-4/6 flex items-center justify-center">
                    <MdPerson className='text-[200px] ' />
                </div>
                <hr />
                <div className="p-4 text-center text-sm">
                    <p className="font-bold">Name</p>
                    <p className="">Occupation</p>
                    <p className="font-bold">Company</p>
                </div>
            </div>
        </div>
    )
}

function Speakers() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    return (
        <div className=" bg-blue-950 py-4">
            <div className='m-8'>
                <Title color='#ffffff' name='Speakers' />
                <Subtitle title='Evolve ICT Summit' color='#ffffff' />
            </div>

            <div className="flex w-full my-40 items-center justify-center text-lg text-white">
                <div className="flex flex-col items-center justify-center">
                    <p className="mb-4">Speakers are loading soon</p>
                    <PulseLoader
                        color="#ffffff"
                        loading={loading}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
                {
                    speakers.map((speaker) => (
                        <Speaker key={speaker.id} />
                    ))
                }
            </div>

            <div className="flex items-center justify-center my-8">
                <Button
                    style={{ backgroundColor: Colors.blue }}
                    className='md:w-1/5 p-6 mb-8'>
                    <Link href={'/speakers'}>View all speakers</Link>
                </Button>
            </div>
        </div>
    )
}

export default Speakers