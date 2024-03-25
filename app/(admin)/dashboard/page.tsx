import React from 'react'
import DashboardCard from './_components/DashboardCard'
import TotalForm from './_components/TotalForm'
import AnnouncementForm from './_components/AnnouncementForm'
import ActivityForm from './_components/ActivityForm'
import ScheduleForm from './_components/ScheduleForm'

function Dashboard
    () {
    return (
        <div className='mt-4'>
            <div className="flex gap-2">
                <div className="" style={{ flex: 4 }}>
                    <div className="flex gap-4">
                        <DashboardCard />
                        <DashboardCard />
                        <DashboardCard />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <TotalForm />
                        <TotalForm />
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
