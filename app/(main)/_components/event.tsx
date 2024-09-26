import { Button } from '@/components/ui/button'
import { Building, Calendar, Loader2 } from 'lucide-react'
import React from 'react'
import EventMenu from './event-menu'

function HomeEvent() {
    return (
        <div className="w-full">
            <div className="bg-purple-950">
                <div className='p-8 grid grid-cols-1 md:grid-cols-5'>
                    <div className="text-white col-span-4 w-[550px]">
                        <p className="text-2xl font-bold">EVENT VENUE</p>
                        <p className="text-5xl font-bold text-slate-300">Get the best experience in the world of marketing</p>
                        <p className="mt-6">Like previous year this year we are arranging world marketing summit 2024. Its the gathering of all the big.</p>
                    </div>
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 p-4 bg-blue-200 rounded-md">
                            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-950">
                                <Calendar className='text-white' />
                            </div>
                            <div className="">
                                <p className="font-bold">Date</p>
                                <p className="text-xs">Time</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-blue-200 rounded-md">
                            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-950">
                                <Building className='text-white' />
                            </div>
                            <div className="">
                                <p className="font-bold">Location</p>
                                <p className="text-xs">Street</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex items-center justify-center">
                    <EventMenu />
                </div>
                {/* <Button>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                </Button> */}
            </div>
        </div>
    )
}

export default HomeEvent