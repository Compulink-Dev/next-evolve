'use client'
import React, { useEffect, useState } from 'react'

function Timer() {

    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {

        const target = new Date("05/02/2024 10:59:59")

        const interval = setInterval(() => {
            const now = new Date()
            const difference = target.getTime() - now.getTime()

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)

            const h = Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            setHours(h)

            const m = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60))
            setMinutes(m)

            const s = Math.floor(difference % (1000 * 60) / 1000)
            setSeconds(s)

        }, 1000)
        return () => clearInterval(interval)
    })

    return (
        <div className="hidden md:flex items-center justify-center">
            <div className="w-20  p-2 h-full rounded-tl rounded-bl shadow-lg bg-blue-300 flex items-center justify-center">
                <p className="text-sm text-blue-950 font-bold">{`${days} days`}</p>
            </div>
            <div className="w-20  p-2 h-full  shadow-lg bg-blue-300 flex items-center justify-center">
                <p className="text-sm text-blue-950 font-bold">{`${hours} hours`}</p>
            </div>
            <div className="w-20  p-2 h-full  shadow-lg bg-blue-300 flex items-center justify-center">
                <p className="text-sm text-blue-950 font-bold">{`${minutes} min`}</p>
            </div>
            <div className="w-20  p-2 h-full rounded-tr rounded-br shadow-lg bg-blue-300 flex items-center justify-center">
                <p className="text-sm text-blue-950 font-bold">{`${seconds} sec`}</p>
            </div>
        </div>
    )
}

export default Timer