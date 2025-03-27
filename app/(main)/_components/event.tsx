'use client'
import { Button } from '@/components/ui/button'
import { Building, Calendar, Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import EventMenu from './event-menu'

// Define the shape of an event
interface Event {
    title: string;
    description: string;
    time: string;
    date: string;
    speaker: {
        name: string;
        role: string;
    };
}

function HomeEvent() {
    // State to hold the list of events and a loading state
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<Event[]>([]); // Explicitly define the type

    useEffect(() => {
        // Simulate an API call to fetch events
        setTimeout(() => {
            // Example data
            const fetchedEvents: Event[] = [
                // {
                //     title: "Technical Services",
                //     description: "A.I Integration to daily lives",
                //     time: "9:00am - 17:00pm",
                //     date: "5th June 2025",
                //     speaker: {
                //         name: "Lloyd Matare",
                //         role: "Developer",
                //     },
                // },
                // {
                //     title: "Marketing Trends",
                //     description: "Exploring new marketing strategies",
                //     time: "10:00am - 18:00pm",
                //     date: "6th June 2025",
                //     speaker: {
                //         name: "Jane Doe",
                //         role: "Marketing Expert",
                //     },
                // },
            ];

            setEvents(fetchedEvents); // Set the fetched events
            setLoading(false); // Loading complete
        }, 2000); // Simulate a 2-second API delay
    }, []);

    return (
        <div className="w-full">
            <div className="bg-purple-950">
                <div className='p-8 grid grid-cols-1 mlggrid-cols-5 gap-4'>
                    <div className="text-white col-span-4 w-full md:w-[550px]">
                        <p className="text-2xl font-bold">EVENT VENUE</p>
                        <p className="text-2xl md:text-5xl font-bold text-slate-300">Get the best experience in the world of I.C.T</p>
                        <p className="mt-6">Like previous year, we are arranging world evolve summit 2025. Its the gathering of all the big.</p>
                    </div>
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 p-4 bg-blue-200 rounded-md">
                            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-950">
                                <Calendar className='text-white' />
                            </div>
                            <div className="">
                                <p className="font-bold">Date</p>
                                <p className="text-xs">3 - 4 July 2025</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-blue-200 rounded-md">
                            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-950">
                                <Building className='text-white' />
                            </div>
                            <div className="">
                                <p className="font-bold">Location</p>
                                <p className="text-xs">Harare International Conference Center</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex items-center justify-center bg-blue-950">
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2  text-slate-300 p-8">
                            <Loader2 className="animate-spin h-6 w-6" />
                            <p>Loading events...</p>
                        </div>
                    ) : events.length > 0 ? (
                        <EventMenu events={events} />
                    ) : (
                        <div className="text-center text-slate-300 py-12">
                            <p className="text-2xl font-bold">No events available at this time</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeEvent;
