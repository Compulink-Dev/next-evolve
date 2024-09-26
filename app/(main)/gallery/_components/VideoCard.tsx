import React from 'react'

function VideoCard({ title, desc, video }: any) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
            <video
                className='col-span-3 rounded w-full'
                src={video} controls={true}></video>
            <div className="col-span-2">
                <p className="text-2xl font-bold">{title}</p>
                <div className="mt-6">
                    <p className="">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard