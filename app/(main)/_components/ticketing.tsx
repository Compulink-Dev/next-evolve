'use client'
import React, { useState } from 'react'
import Title from './title'
import { BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Badge component for ticket details
const Badge = ({ title }: any) => {
    return (
        <div className="flex items-center gap-4">
            <BadgeCheck className='hover:animate-spin delay-75' />
            <p className="">{title}</p>
        </div>
    )
}

// TicketCard component with dynamic data
const TicketCard = ({ type, price, perks }: { type: string, price: string, perks: string[] }) => {
    return (
        <div className="bg-[#191970] hover:animate-pulse delay-200 hover:bg-purple-800 p-8 rounded-2xl text-slate-400">
            <div className="">
                <div className="py-1 px-2 w-auto bg-purple-600 rounded">
                    <div className="">{type}</div>
                </div>
                <div className="text-5xl font-bold my-6">
                    <p className="">{price}
                        <span className="pl-2 text-sm">/month</span>
                    </p>
                </div>
                <p className="">For one Person Ticket</p>
                <div className="mt-20 space-y-8">
                    {perks.map((perk, index) => (
                        <Badge key={index} title={perk} />
                    ))}
                </div>
                <Button className='bg-blue-600 hover:bg-blue-400 mt-8 w-full'>Buy a Ticket</Button>
            </div>
        </div>
    )
}

// Ticketing component with tabs for different categories
function Ticketing() {
    const [activeTab, setActiveTab] = useState('delegates');

    // Different packages for different tabs
    const ticketPackages = {
        delegates: [
            { type: 'Platinum Pass', price: '$66', perks: ['Regular Seating', 'VIP Access', 'Free Lunch'] },
            { type: 'Gold Pass', price: '$50', perks: ['Regular Seating', 'Priority Access'] },
            { type: 'Silver Pass', price: '$30', perks: ['Regular Seating'] },
        ],
        sponsors: [
            { type: 'Diamond Sponsorship', price: '$200', perks: ['Exhibition Space', '5 VIP Tickets', 'Logo Placement'] },
            { type: 'Gold Sponsorship', price: '$150', perks: ['Exhibition Space', '3 VIP Tickets'] },
        ],
        exhibitors: [
            { type: 'Exhibitor Booth', price: '$100', perks: ['10x10 Booth', '2 Exhibitor Passes'] },
            { type: 'Exhibitor Plus', price: '$150', perks: ['10x10 Booth', '4 Exhibitor Passes', 'Marketing Materials'] },
        ],
        students: [
            { type: 'Student Pass', price: '$15', perks: ['General Admission', 'Access to all sessions'] },
            { type: 'Early Bird Student', price: '$10', perks: ['General Admission', 'Access to all sessions'] },
        ],
    };

    return (
        <div className='bg-blue-950 p-8'>
            <div className="text-slate-400 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="">
                    <Title title="TICKET PRICING" />
                    <p className="text-4xl tracking-widest font-bold">Event Pass & Tickets</p>
                </div>
                <div className="">
                    <p className="">Like previous year, this year we are arranging world marketing summit 2024. It’s the gathering of all the big and amazing marketing & branding minds from all over the world.</p>
                </div>
            </div>

            {/* Tabs for different categories */}
            <div className="mt-8">
                <div className="flex space-x-1 text-slate-400">
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'delegates' ? 'bg-purple-800 text-black' : 'bg-purple-600'}`}
                        onClick={() => setActiveTab('delegates')}
                    >
                        Delegates
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'sponsors' ? 'bg-purple-800 text-black' : 'bg-purple-600'}`}
                        onClick={() => setActiveTab('sponsors')}
                    >
                        Sponsors
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'exhibitors' ? 'bg-purple-800 text-black' : 'bg-purple-600'}`}
                        onClick={() => setActiveTab('exhibitors')}
                    >
                        Exhibitors
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'students' ? 'bg-purple-800 text-black' : 'bg-purple-600'}`}
                        onClick={() => setActiveTab('students')}
                    >
                        Students
                    </button>
                </div>

                {/* Displaying the relevant ticket packages based on activeTab */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {
                        //@ts-ignore
                        ticketPackages[activeTab].map((ticket, index) => (
                            <TicketCard key={index} type={ticket.type} price={ticket.price} perks={ticket.perks} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Ticketing;
