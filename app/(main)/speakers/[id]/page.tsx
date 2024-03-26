import Image from 'next/image';
import React from 'react'

const getSpeakerById = async (id: any) => {
    try {
        const res = await fetch(`${process.env.API_ROUTE}/api/speakers/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch speaker");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};


async function Speaker({ params }: any) {
    const { id } = params
    console.log("Id :", id);
    const { speaker } = await getSpeakerById(id)

    return (
        <div className="">
            <div className='p-8 flex flex-col md:flex-row'>
                <div className="flex flex-col items-center" style={{ flex: 2 }}>
                    <Image src={speaker.imageUrl} width={400} height={400} alt='logo' className='rounded-full h-40 w-40 md:h-80 md:w-80' />
                    <div className="mt-4 text-center flex flex-col gap-3">
                        <p className="text-lg md:text-2xl font-bold">{speaker.name}</p>
                        <p className="text-xs md:text-sm">{speaker.position}</p>
                        <p className="text-sm md:text-lg font-bold">{speaker.company}</p>
                    </div>
                </div>
                <div className="p-4 border rounded mt-6" style={{ flex: 4 }}>
                    <p className="text-2xl mt-4" >About speaker</p>
                    <p className="text-sm mt-4" >{speaker.bio}</p>

                    <div className="">
                        <p className="text-2xl mt-4" >Featured speakers</p>
                        <p className="text-sm mt-4" >{speaker.company}</p>
                    </div>

                    <div className="">
                        <p className="text-2xl mt-4" >Social media</p>
                        <p className="text-sm mt-4" >{speaker.company}</p>
                    </div>

                    <div className="">
                        <p className="text-2xl mt-4" >Is speaking at</p>
                        <p className="text-sm mt-4" >{speaker.company}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Speaker