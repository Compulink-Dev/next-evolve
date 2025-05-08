"use client";
import React, { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { Button } from "@/components/ui/button";
import Title from "@/components/NewTitle";
import { ArrowUp } from "lucide-react";

function VideoTab() {
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch("/api/gallery/client");
        const data = await response.json();
        setGalleryData(data);

        // Extract all videos from gallery items
        const allVideos = data.flatMap((item: any) =>
          item.videos.map((v: any) => ({
            ...v,
            galleryItemId: item._id,
            galleryItemTitle: item.title,
          }))
        );
        setVideos(allVideos);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleryData();
  }, []);

  const handleVideoChange = (newVideoUrl: string) => {
    setLoading(true);
    setTimeout(() => {
      setVideo(newVideoUrl);
      setLoading(false);
    }, 500);
  };

  const selectedVideo = videos.find((v) => v.url === video);

  return (
    <div>
      <div className="">
        <Title
          title="Welcome to our Gallery"
          subtitle="show casing our previous events"
        />
      </div>

      {videos.length > 0 && (
        <>
          <div className="mb-4 flex space-x-1 overflow-x-auto pb-2">
            {videos.map((v) => (
              <Button
                key={v.url}
                variant={"outline"}
                onClick={() => handleVideoChange(v.url)}
                className={`min-w-max transition duration-200 ${
                  video === v.url ? "bg-blue-800 text-white" : "bg-blue-950"
                }`}
              >
                {v.title} ({v.galleryItemTitle})
              </Button>
            ))}
          </div>

          {loading ? (
            <p>Loading video...</p>
          ) : !selectedVideo ? (
            <p className="flex items-center gap-2 font-bold">
              Please select a video to watch.
              <span className="">
                <ArrowUp className="animate-bounce" />
              </span>
            </p>
          ) : (
            <VideoCard
              video={selectedVideo.url}
              title={selectedVideo.title}
              desc={selectedVideo.galleryItemTitle}
            />
          )}
        </>
      )}
    </div>
  );
}

export default VideoTab;
