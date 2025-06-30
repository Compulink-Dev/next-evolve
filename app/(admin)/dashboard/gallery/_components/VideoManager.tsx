"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function VideoManager({
  videos,
  onAdd,
  onDelete,
  isLoading,
}: {
  videos: { title: string; url: string }[];
  onAdd: (video: { title: string; url: string }) => Promise<void>;
  onDelete: (url: string) => Promise<void>;
  isLoading?: boolean;
}) {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const { toast } = useToast();

  const extractYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleAddVideo = async () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please provide a video title",
        variant: "destructive",
      });
      return;
    }

    if (!youtubeUrl) {
      toast({
        title: "Error",
        description: "Please provide a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      toast({
        title: "Error",
        description:
          "Invalid YouTube URL. Please provide a valid YouTube link.",
        variant: "destructive",
      });
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const newVideo = { title, url: embedUrl };

    try {
      console.log("Attempting to add video:", newVideo);
      await onAdd(newVideo);
      console.log("Video added successfully - current videos:", videos);

      setTitle("");
      setYoutubeUrl("");
      toast({
        title: "Success",
        description: "YouTube video added successfully",
      });
    } catch (error) {
      console.error("Error adding video:", error);
      toast({
        title: "Error",
        description: "Failed to add YouTube video. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add YouTube Video</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <Input
            placeholder="YouTube URL (e.g., https://youtube.com/watch?v=...)"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button
          type="button"
          onClick={handleAddVideo}
          disabled={isLoading || !title || !youtubeUrl}
          className="mt-2"
        >
          {isLoading ? "Adding..." : "Add Video"}
        </Button>
      </div>

      {videos.length > 0 && (
        <div className="space-y-4">
          <Label>YouTube Videos</Label>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">{video.title}</h4>
                <div className="aspect-video w-full">
                  <iframe
                    src={video.url}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(video.url)}
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
