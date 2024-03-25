import React from 'react'
import { MdDonutLarge } from 'react-icons/md'

function AnnouncementCard() {
    return (
        <div className='bg-slate-300 rounded-md py-2 px-4 h-auto w-full flex items-center justify-between'>
            <div className="flex flex-col gap-2">
                <p className="">Outing schedule</p>
                <p className="text-xs text-slate-400">5 minutes</p>
            </div>
            <div className="flex gap-4">
                <MdDonutLarge />
                <MdDonutLarge />
            </div>
        </div>
    )
}

export default AnnouncementCard