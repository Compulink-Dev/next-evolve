import React from 'react'

function TotalForm() {
    return (
        <div className='border h-full p-4 space-y-4 rounded w-full'>
            <div className="flex items-start justify-between">
                <div className="">
                    <p className="font-bold text-md">Total Sponsors</p>
                    <p className="font-bold text-4xl">50</p>
                </div>
                <div className="">
                    <p className="">Circular Progress</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="">
                    <p className="text-sm text-slate-200">40 Men</p>
                    <p className="text-sm text-slate-200">10 Women</p>
                </div>
                <div className="">
                    <p className="text-xs bg-orange-200 p-2 rounded">+2% Past month</p>
                </div>
            </div>
        </div>
    )
}

export default TotalForm