import { Colors } from '@/constant/colors';
import React from 'react'
import CircleLoader from "react-spinners/ClipLoader";

function Loading() {
    return (
        <div
            style={{ backgroundColor: Colors.secondary }}
            className='h-screen w-screen bg-blue-950 flex justify-center items-center'>
            <CircleLoader
                color="#ffffff"
                size={200}
                speedMultiplier={1}
            />
        </div>
    )
}

export default Loading