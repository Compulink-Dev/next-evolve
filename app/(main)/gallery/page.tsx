import Layout from '@/components/Layout'
import React from 'react'
import GalleryCard from './_components/GalleryCard'
import VideoTab from './_components/VideoTab'

function Gallery() {
    return (
        <div>
            <div className='p-8 bg-purple-950 text-slate-400'>
                <div className="">
                    <VideoTab />
                </div>
                <div className="">
                    <GalleryCard />
                </div>
            </div>
        </div>
    )
}

export default Gallery