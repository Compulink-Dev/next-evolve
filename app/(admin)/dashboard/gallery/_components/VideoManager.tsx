"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";

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
  const [localVideos, setLocalVideos] = useState(videos);
  const [key, setKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setLocalVideos(videos);
  }, [videos]);

  const handleUploadComplete = async (res: any[]) => {
    console.log("Upload complete response:", res); // Add this
    if (!title) {
      toast({
        title: "Error",
        description: "Please provide a title before uploading",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileUrl = res[0].url;
      if (!fileUrl) throw new Error("No URL returned from upload");

      const newVideo = { title, url: fileUrl };
      console.log("New video added:", newVideo);
      setLocalVideos((prev) => [...prev, newVideo]);

      await onAdd(newVideo);
      setTitle("");
      toast({ title: "Success", description: "Video uploaded successfully" });
    } catch (error) {
      setLocalVideos(videos);
      toast({
        title: "Error",
        description: "Failed to save uploaded video",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add Video</Label>
        <div className="">
          <Input
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />

          <UploadDropzone
            className="p-4 ut-label:text-lg ut-uploading:text-red-300"
            endpoint="mediaPost"
            onClientUploadComplete={(res) => {
              handleUploadComplete(res);
              // Add a small delay before resetting to show success
              setTimeout(() => {
                // This will force a re-render of the dropzone
                setKey(Math.random().toString(36).substring(7));
              }, 2000);
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Upload Error",
                description: error.message,
                variant: "destructive",
              });
            }}
            config={{
              mode: "auto",
            }}
            appearance={{
              button: ({ ready }) =>
                `px-4 py-2 rounded-md font-medium ${
                  ready
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`,
              allowedContent: "Video will appear below after upload",
            }}
            key={key} // Add this key prop
          />
        </div>
      </div>

      {localVideos.length > 0 && (
        <div className="space-y-4">
          <Label>Uploaded Videos</Label>
          <div className="space-y-4">
            {localVideos.map((video, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">{video.title}</h4>
                <div className="aspect-video w-full">
                  <video
                    controls
                    src={video.url}
                    className="w-full h-full rounded-lg"
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
