import React from 'react'

function Countdown({ value, type }: any) {
    return (
        <div className="bg-blue-900 animate-pulse delay-1000 h-32 w-32 flex flex-col items-center justify-center  rounded-tr-[50px] rounded-bl-[50px]">
            <p className="text-4xl font-bold">{value}</p>
            <p className="font-bold">{type}</p>
        </div>
    )
}

export default Countdown