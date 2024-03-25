import { Colors } from '@/constant/colors';
import Link from 'next/link'
import { useState, CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Title from "@/components/Title"
import Subtitle from "@/components/subtitle"
import { Button } from '@/components/ui/button';


const getDetailsById = async (id: any) => {
    try {
        const res = await fetch(`http://localhost:3000/api/home/${id}`, {
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



const Event = () => {
    return (
        <div className="w-full md:w-[400px] h-[400px] border rounded text-center">
            <div className="h-2/5 bg-purple-600 rounded-tl rounded-tr"></div>
            <Subtitle color='text-purple-600' name='Artificial Intelligence' />
        </div>
    )
}

async function About() {

    const detail = await getDetailsById('65fd54cad25c638b64ddf4b5')

    return (
        <div
            style={{ backgroundColor: Colors.bgColor }}
        >
            <div

                className='m-8 '>
                <div className="text-center pt-8">
                    <Title
                        color={Colors.primary} name={detail.home.title} />
                    <p className="text-gray-500 mt-2 mx-8 text-sm">{detail.home.description}</p>
                </div>
                <div className="w-full flex items-center justify-between flex-wrap gap-4 md:gap-0 my-8">
                    {/* <Event />
                <Event />
                <Event /> */}
                    <div className="flex w-full my-36 items-center justify-center text-lg ">
                        <div className="flex flex-col items-center justify-center">
                            {/* <p
                                style={{ color: Colors.primary }}
                                className="mb-4">Events are loading soon...</p>
                            <PulseLoader
                                color={Colors.primary}
                                loading={loading}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center my-8">
                    <Button
                        style={{ backgroundColor: Colors.blue }}
                        className='md:w-1/5 p-6 bg-purple-600 mb-8'>
                        <Link href={'/login'}>Register your interest</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default About