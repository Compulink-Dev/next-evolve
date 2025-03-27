import Image from 'next/image'
import React from 'react'
import Title from './title'
import Tile from '@/components/NewTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react'

// Event data array
const events = [
  {
    id: 1,
    icon: <Lightbulb />,
    title: "Idea Sharing",
    description: "To give back to the ICT community in Zimbabwe and Africa through the training and equipping of the next generation the ICT professionals and ethusiasists under the gathering of great minds for the purposes of imparting,sharing and gaining ICT knowledge skills from one another",
    buttonText: "Read More"
  },
  {
    id: 2,
    icon: <Lightbulb />, // You can use different icons for each event
    title: "Networking",
    description: "Connect with industry leaders and like-minded professionals from around the Zimbabwe and Africa.",
    buttonText: "Learn More"
  },
  {
    id: 3,
    icon: <Lightbulb />,
    title: "Unification",
    description: "Provide a platform for the African Continent to unite under the same banner of shared knowledge for the purposes of ICT advancement and development.",
    buttonText: "Discover"
  }
];

const EventCard = ({ event }: any) => {
    return (
        <div className="w-full hover:shadow-lg p-4 rounded-xl hover:p-8 hover:bg-purple-900 transition-[padding, background-color, box-shadow] duration-500 ease-in-out">
            <div className="rounded-full bg-purple-700 text-white w-12 flex items-center justify-center h-12">
                {event.icon}
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-300">
                {event.title}
            </p>
            <p className="my-6">
                {event.description}
            </p>
            <Button
                variant={'ghost'}
                className="flex items-center gap-2">
                <ArrowRight size={14} />
                <p className="">{event.buttonText}</p>
            </Button>
        </div>
    );
};


function HomeAbout() {
    return (
        <div className='bg-blue-950 text-white p-8'>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                <Image
                    className='col-span-2 w-full h-full rounded'
                    src={'/evolve.jpg'} alt='' width={100} height={100} />
                <div className="col-span-4">
                    <Title title="About Event" />
                    <p className="my-8 flex flex-col text-slate-300 text-6xl font-bold">
                        Explore Amazing
                        <span className='text-slate-400'>Technical Ideas</span>
                    </p>
                    <p className="">Like previous year, we are arranging world evolve summit 2025. Its the gathering of all the big and amazing I.C.T & branding minds from all over the world. Discussing the best techniques for branding to deep dive into consumers mind. Will try to spread best knowledge about I.C.T</p>
                    <Button className='my-8 bg-blue-600 hover:bg-blue-500'>Explore Us</Button>
                </div>
            </div>
            <div className="">
                <Tile
                    title="Why You Should Join"
                    subtitle="The Event ?"
                />
                <div className="grid grid-col-1 lg:grid-cols-3 gap-8 p-8">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeAbout