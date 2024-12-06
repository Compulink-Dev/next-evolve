
import React from 'react'
import DashboardCard from './_components/DashboardCard'
import TotalForm from './_components/TotalForm'
import AnnouncementForm from './_components/AnnouncementForm'
import ActivityForm from './_components/ActivityForm'
import ScheduleForm from './_components/ScheduleForm'
import Link from 'next/link'


interface VisitorProps {
    name: string
    surname: string
    position: string
    company: string
    status: string
    number: string
    country: string
    email: string
    industry: string
}

interface CardProps {
    title: string
    figure: number
    subtitle: string
}



const getVisitors = async () => {
    try {
        const res = await fetch(`${process.env.API_ROUTE}/api/registration/`, {
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error("Failed to fetch visitors")
        }
        return res.json()
    } catch (error) {
        console.log("Error loading visitors", error);

    }
}

const VisitorCard = ({ title, figure, subtitle }: CardProps) => {
    return (
        <Link
            href={'/dashboard/visitors'}
            className='h-36 w-full bg-blue-300 p-4 rounded-lg flex flex-col items-start justify-between'>
            <p className="text-sm md:text-md font-bold">{title}</p>
            <p className="text-lg md:text-4xl font-bold">{figure}</p>
            <p className="text-xs md:text-sm">{subtitle}</p>
        </Link>
    )
}


async function Dashboard() {
    const { visitors } = await getVisitors()
    let number = 0

    return (
        <div className='mt-4'>
            <div className="">
                {
                    visitors?.map((data: any, index: any) => {
                        number = index
                        return (
                            <div key={index} className="hidden">{index}
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="" style={{ flex: 4 }}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <VisitorCard
                            title='Visitors'
                            figure={number}
                            subtitle='Confirmed visitors'
                        />
                        <DashboardCard
                            title='Visitors'
                            figure={10}
                            subtitle='Pending confirmation'
                        />
                        <DashboardCard
                            title='Visitors'
                            figure={2}
                            subtitle='Awaiting approval'
                        />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <TotalForm
                            title='Total Sponsors'
                            figure={12}
                            progress={12}
                            gender='12 Male'
                            gender2='20 Fe,male'
                            average='2% per month'
                        />
                        <TotalForm
                            title='Total Visitors'
                            figure={number}
                            progress={number}
                            gender='12 Male'
                            gender2='20 Fe,male'
                            average='2% per month'
                        />
                    </div>
                    <div className="my-4">
                        <AnnouncementForm />
                    </div>
                </div>

                <div className="" style={{ flex: 2 }}>
                    <ActivityForm />
                    <div className="my-4">
                        <ScheduleForm />
                    </div>
                </div>



            </div>



        </div>
    )
}

export default Dashboard
