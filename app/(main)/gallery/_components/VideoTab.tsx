'use client'
import React, { useState } from 'react'
import VideoCard from './VideoCard'
import { Button } from '@/components/ui/button'

function VideoTab() {
    const [video, setVideo] = useState('')  // Selected video
    const [loading, setLoading] = useState(false)  // Loading state

    // Video data array
    const videos = [
        { id: 'harare', video: '/harare.mp4', title: 'Harare', desc: 'Harare Show' },
        { id: 'bulawayo', video: '/bulawayo.mp4', title: 'Bulawayo', desc: 'Bulawayo Show' },
        { id: 'victoriaFalls', video: '/victoria-falls.mp4', title: 'Victoria Falls', desc: 'Victoria Falls Show' }
    ]

    const handleVideoChange = (newVideoId: any) => {
        setLoading(true)  // Start loading when the video is changed
        setTimeout(() => {
            setVideo(newVideoId)  // Set the new video after loading
            setLoading(false)  // Stop loading
        }, 500)  // Simulate loading delay (500ms)
    }

    // Find the selected video object from the array
    const selectedVideo = videos.find(v => v.id === video)

    return (
        <div className=''>
            <div className="mb-4">
                {videos.map((v) => (
                    <Button
                        key={v.id}
                        variant={'outline'}
                        onClick={() => handleVideoChange(v.id)}
                    >
                        {v.title}
                    </Button>
                ))}
            </div>
            {
                loading ? (
                    <p>Loading video...</p>  // Display loading state
                ) : !selectedVideo ? (
                    <p>Please select a video to watch.</p>  // No video selected
                ) : (
                    <VideoCard
                        video={selectedVideo.video}
                        title={selectedVideo.title}
                        desc={selectedVideo.desc}
                    />
                )
            }
        </div>
    )
}

export default VideoTab
