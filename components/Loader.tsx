'use client'
import React, { useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import Title from "./Title";
import { Colors } from "@/constant/colors";


interface LoaderProps {
    title: String
    paint: String
}

function Loader({ title, paint }: LoaderProps) {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");


    return (
        <div className="flex flex-col items-center justify-center my-20">
            <p
                style={{ color: Colors.primary }}
                className="mb-4 text-lg text-purple-900">Partners are loading soon</p>
            <PulseLoader
                color={Colors.white}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader