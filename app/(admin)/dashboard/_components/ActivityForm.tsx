import { Button } from '@/components/ui/button'
import { Colors } from '@/constant/colors'
import React from 'react'

function ActivityForm() {
    return (
        <div
            style={{ backgroundColor: Colors.primary }}
            className='p-4 border h-72 rounded-lg w-full text-white flex flex-col justify-between gap-4'>
            <p className="text-lg">ActivityForm</p>
            <div className="">
                <p className="text-sm text-slate-200">Time and Date</p>
                <p className="font-bold text-lg">Title</p>
                <p className="text-md text-slate-200">Description</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="">Total activities</p>
                <Button className='bg-blue-500'>See Activity</Button>
            </div>
        </div>
    )
}

export default ActivityForm