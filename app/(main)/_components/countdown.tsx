'use client'
import { Dot } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CountdownProps {
    targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                // If the countdown is over
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            }
        };

        // Start by calculating the time left
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex flex-col md:flex-row items-center space-x-2">
            <div className="bg-blue-900 animate-pulse delay-1000 h-32 w-32 flex flex-col items-center justify-center  rounded-tr-[50px] rounded-bl-[50px]">
                <span className="text-3xl font-bold">{timeLeft.days}</span>
                <span>Days</span>
            </div>
            <div className="flex flex-col">
                <Dot />
                <Dot />
            </div>
            <div className="bg-blue-900 animate-pulse delay-1000 h-32 w-32 flex flex-col items-center justify-center  rounded-tr-[50px] rounded-bl-[50px]">
                <span className="text-3xl font-bold">{timeLeft.hours}</span>
                <span>Hours</span>
            </div>
            <div className="flex flex-col">
                <Dot />
                <Dot />
            </div>
            <div className="bg-blue-900 animate-pulse delay-1000 h-32 w-32 flex flex-col items-center justify-center  rounded-tr-[50px] rounded-bl-[50px]">
                <span className="text-3xl font-bold">{timeLeft.minutes}</span>
                <span>Minutes</span>
            </div>
            <div className="flex flex-col">
                <Dot />
                <Dot />
            </div>
            <div className="bg-blue-900 animate-pulse delay-1000 h-32 w-32 flex flex-col items-center justify-center  rounded-tr-[50px] rounded-bl-[50px]">
                <span className="text-3xl font-bold">{timeLeft.seconds}</span>
                <span>Seconds</span>
            </div>
        </div>
    );
};

export default Countdown;
