'use client'
import { Colors } from '@/constant/colors';
import React, { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/ClipLoader';

function Loading() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set a timeout of 40 seconds (40,000 milliseconds)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 40000); // 40 seconds

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    if (!loading) {
        return null; // Or replace this with any content to show after 40 seconds
    }

    return (
        <div className='h-screen w-screen bg-purple-950 flex justify-center items-center z-50'>
            <CircleLoader
                color={Colors.white}
                size={200}
                speedMultiplier={1}
            />
        </div>
    );
}

export default Loading;
