'use client';
import React, { useState } from 'react';
import VideoCard from './VideoCard';
import { Button } from '@/components/ui/button';
import Title from '@/components/NewTitle';
import { ArrowUp } from 'lucide-react';

function VideoTab() {
    const [video, setVideo] = useState('');  // Selected video
    const [loading, setLoading] = useState(false);  // Loading state

    // Video data array
    const videos = [
        { id: 'harare', video: '/harare.mp4', title: 'Harare', desc: 'Harare Show' },
        { id: 'bulawayo', video: '/bulawayo.mp4', title: 'Bulawayo', desc: 'Bulawayo Show' },
        { id: 'evolve', video: '/evolve.mp4', title: 'Evolve I.C.T', desc: 'Evolve I.C.T Show' },
    ];

    const handleVideoChange = (newVideoId: any) => {
        setLoading(true);  // Start loading when the video is changed
        setTimeout(() => {
            setVideo(newVideoId);  // Set the new video after loading
            setLoading(false);  // Stop loading
        }, 500);  // Simulate loading delay (500ms)
    };

    // Find the selected video object from the array
    const selectedVideo = videos.find(v => v.id === video);

    return (
        <div>
            <div className="">
                <Title
                    title="Welcome to our Gallery"
                    subtitle="show casing our previous events"
                />
            </div>
            <div className="mb-4 flex space-x-1">
                {videos.map((v) => (
                    <Button
                        key={v.id}
                        variant={'outline'}
                        onClick={() => handleVideoChange(v.id)}
                        className={`transition duration-200 ${video === v.id ? 'bg-blue-800 text-white' : 'bg-blue-950'}`}
                    >
                        {v.title}
                    </Button>
                ))}
            </div>
            {
                loading ? (
                    <p>Loading video...</p>  // Display loading state
                ) : !selectedVideo ? (
                    <p className='flex items-center gap-2 font-bold'>
                        Please select a video to watch.
                        <span className="">
                            <ArrowUp className='animate-bounce' />
                        </span>
                    </p>  // No video selected
                ) : (
                    <VideoCard
                        video={selectedVideo.video}
                        title={selectedVideo.title}
                        desc={selectedVideo.desc}
                    />
                )
            }
        </div>
    );
}

export default VideoTab;
