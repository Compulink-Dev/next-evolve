import React from 'react'
import Title from './title'
import { BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Badge = ({ title }: any) => {
    return (
        <div className="flex items-center gap-4">
            <BadgeCheck className='hover:animate-spin delay-75' />
            <p className="">{title}</p>
        </div>
    )
}


const TicketCard = () => {
    return (
        <div className="bg-[#191970] hover:animate-pulse delay-200 hover:bg-purple-800 p-8 rounded-2xl text-slate-400 ">
            <div className="">
                <div className="py-1 px-2 w-auto bg-purple-600 rounded">
                    <div className="">Platinum Pass</div>
                </div>
                <div className="text-5xl font-bold my-6">
                    <p className="">$66
                        <span className="pl-2 text-sm">/month</span>
                    </p>
                </div>
                <p className="">For one Person Ticket</p>
                <div className="mt-20 space-y-8">
                    <Badge title="Regular Seating" />
                    <Badge title="Regular Seating" />
                    <Badge title="Regular Seating" />
                    <Badge title="Regular Seating" />
                    <Badge title="Regular Seating" />
                </div>
                <Button className='bg-blue-600 hover:bg-blue-400 mt-8 w-full'>Buy a Ticket</Button>
            </div>
        </div>
    )
}


function Ticketing() {
    return (
        <div className='bg-blue-950 p-8'>
            <div className="text-slate-400 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="">
                    <Title title="TICKET PRICING" />
                    <p className="text-4xl tracking-widest font-bold">Event Pass & Tickets</p>
                </div>
                <div className="">
                    <p className="">Like previous year this year we are arranging world marketing summit 2024. Its the gathering of all the big and amazing marketing & branding minds from all over the world.</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <TicketCard />
                <TicketCard />
                <TicketCard />
            </div>
        </div>
    )
}

export default Ticketing