import Image from 'next/image'
import React from 'react'
import Title from './title'
import Tile from '@/components/NewTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react'


const EventCard = () => {
    return (
        <div className="w-full hover:shadow-lg p-4 rounded-xl hover:p-8 hover:bg-purple-900 transition-[padding, background-color, box-shadow] duration-500 ease-in-out">
            <div className="rounded-full bg-purple-700 text-white w-12 flex items-center justify-center h-12">
                <Lightbulb />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-300">
                Idea Sharing
            </p>
            <p className="my-6">
                You will get opportunity to share different marketing ideas to every participant in the conference.
                Read More
            </p>
            <Button
                variant={'ghost'}
                className="flex items-center gap-2">
                <ArrowRight size={14} />
                <p className="">Read More</p>
            </Button>
        </div>
    );
};


function HomeAbout() {
    return (
        <div className='bg-blue-950 text-white p-8'>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                <Image
                    className='col-span-2 w-full h-full rounded'
                    src={'/evolve.jpg'} alt='' width={100} height={100} />
                <div className="col-span-4">
                    <Title title="About Event" />
                    <p className="my-8 flex flex-col text-slate-300 text-6xl font-bold">
                        Explore Amazing
                        <span className='text-slate-400'>Technical Ideas</span>
                    </p>
                    <p className="">Like previous year this year we are arranging world marketing summit 2024. Its the gathering of all the big and amazing marketing & branding minds from all over the world. Discussing the best tech niques for branding to deep dive into consumers mind. Will try to spread best knowledge about marketing.</p>
                    <Button className='my-8 bg-blue-600 hover:bg-blue-500'>Explore Us</Button>
                </div>
            </div>
            <div className="">
                <Tile
                    title="Why You Should Join"
                    subtitle="The Event ?"
                />
                <div className="grid grid-col md:grid-cols-3 gap-8 p-8">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
        </div>
    )
}

export default HomeAbout