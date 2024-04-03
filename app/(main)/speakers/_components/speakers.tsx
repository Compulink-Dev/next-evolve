
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { SpeakerDialog } from './dialog'
import { Colors } from '@/constant/colors'



const getSpeakers = async () => {
    try {
        const res = await fetch(`${process.env.API_ROUTE}/api/speakers`, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch speakers")
        }

        return res.json()
    } catch (error) {
        console.log("Error loading speakers", error);

    }
}



async function Speakers() {
    const { speakers } = await getSpeakers()
    console.log(speakers._id);
    return (
        <>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 gap-x-4 bg-blue-500 py-12" style={{ backgroundColor: Colors.primary }}>
                {
                    speakers.map((speak: any) => (
                        <SpeakerDialog
                            key={speak._id}
                            link={`/speakers/${speak._id}`}
                            name={speak.name}
                            imageUrl={speak.imageUrl}
                            desc={speak.company}
                            pos={speak.position}
                            bio={speak.bio}
                        />
                    ))
                }
            </div>

        </>
    )
}

export default Speakers