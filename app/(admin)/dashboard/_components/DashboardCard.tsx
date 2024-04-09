import React from 'react'



interface CardProps {
    title: string
    figure: number
    subtitle: string
}

function DashboardCard({ title, figure, subtitle }: CardProps) {
    return (
        <div className='h-36 w-full bg-blue-300 p-4 rounded-lg flex flex-col items-start justify-between'>
            <p className="text-sm md:text-md font-bold">{title}</p>
            <p className="text-lg md:text-4xl font-bold">{figure}</p>
            <p className="text-xs md:text-sm">{subtitle}</p>
        </div>
    )
}

export default DashboardCard