import React from 'react'


interface FormProps {
    title: string
    figure: string
    progress: string
    gender: string
    gender2: string
    average: string
}

function TotalForm({ title, figure, progress, gender, gender2, average }: FormProps) {
    return (
        <div className='border h-full p-4 space-y-4 rounded w-full'>
            <div className="flex items-start justify-between">
                <div className="">
                    <p className="font-bold text-md">{title}</p>
                    <p className="font-bold text-4xl">{figure}</p>
                </div>
                <div className="">
                    <p className="">{progress}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="">
                    <p className="text-sm text-slate-400">{gender}</p>
                    <p className="text-sm text-slate-400">{gender2}</p>
                </div>
                <div className="">
                    <p className="text-xs bg-orange-200 p-2 rounded">{average}</p>
                </div>
            </div>
        </div>
    )
}

export default TotalForm