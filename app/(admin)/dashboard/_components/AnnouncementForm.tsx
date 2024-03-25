import { Colors } from '@/constant/colors'
import React from 'react'
import AnnouncementCard from './AnnouncementCard'

function AnnouncementForm() {
    return (
        <div
            style={{ height: '300px' }}
            className='p-2 border rounded-lg'>
            <p className="text-lg font-extrabold text-blue-950">AnnouncementForm</p>
            <div className="mt-1">
                <AnnouncementCard />
            </div>
        </div>
    )
}

export default AnnouncementForm