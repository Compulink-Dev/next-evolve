// carousel.tsx
"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";


const Carousel = ({ data }) => {
    // State and Ref initialization
    const [currentImg, setCurrentImg] = useState(0)
    const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 })
    const carouselRef = useRef(null)

    // useEffect to get the initial carousel size
    useEffect(() => {
        let elem = carouselRef.current
        let { width, height } = elem.getBoundingClientRect()
        if (carouselRef.current) {
            setCarouselSize({
                width,
                height,
            })
        }
    }, [])

    return (
        <div>
            {/* Carousel container */}
            <div className='w-full h-[400px] md:h-[500px] overflow-hidden relative'>
                {/* Image container */}
                <div
                    ref={carouselRef}
                    style={{
                        left: -currentImg * carouselSize.width
                    }}
                    className='w-full h-full absolute flex transition-all duration-300'>
                    {/* Map through data to render images */}
                    {data.map((v, i) => (
                        <div key={i} className='relative shrink-0 w-full h-full'>
                            <Image
                                className='pointer-events-none object-fill md:object-cover'
                                alt={`carousel-image-${i}`}
                                fill
                                src={v.image || "https://random.imagecdn.app/500/500"}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className='flex justify-center mt-3'>
                <button
                    disabled={currentImg === 0}
                    onClick={() => setCurrentImg(prev => prev - 1)}
                    className={`border px-4 py-2 font-bold text-2xl text-blue-800 ${currentImg === 0 && 'opacity-50'}`}
                >
                    <IoMdArrowDropleftCircle />
                </button>
                <button
                    disabled={currentImg === data.length - 1}
                    onClick={() => setCurrentImg(prev => prev + 1)}
                    className={`border px-4 py-2 font-bold text-2xl text-blue-800 ${currentImg === data.length - 1 && 'opacity-50'}`}
                >
                    <IoMdArrowDroprightCircle />
                </button>
            </div>
        </div>
    )
}

export default Carousel