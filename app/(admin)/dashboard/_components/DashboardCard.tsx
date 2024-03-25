import React from 'react'

function DashboardCard() {
    return (
        <div className='h-36 w-full bg-blue-300 p-4 rounded-lg flex flex-col items-start justify-between'>
            <p className="text-md font-bold">Available Position</p>
            <p className="text-4xl font-bold">24</p>
            <p className="">4 seats left</p>
        </div>
    )
}

export default DashboardCard