"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import GalleryManager from "./GalleryManager";
import VideoManager from "./VideoManager";

export default function GalleryForm({
  item,
  onSubmit,
  isLoading,
}: {
  item?: {
    _id?: string;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    videoUrl?: string;
    gallery: string[];
    videos: { title: string; url: string }[];
  };
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}) {
  const [formData, setFormData] = useState(
    item || {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      imageUrl: "",
      videoUrl: "",
      gallery: [],
      videos: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddImage = async (url: string) => {
    const updatedGallery = [...formData.gallery, url];
    console.log("Adding image to form state:", url);
    console.log("Adding UpdatedGallery to form state:", updatedGallery);
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, url],
    }));
    console.log("Updated formData:", formData);
    console.log("Updated formData gallery:", formData.gallery);
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const handleDeleteImage = async (url: string) => {
    const updatedGallery = formData.gallery.filter((img) => img !== url);
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const handleAddVideo = async (video: { title: string; url: string }) => {
    console.log("Adding video:", video); // Add this

    const updatedVideos = [...formData.videos, video];
    console.log("Adding video to form state:", video);
    console.log("Adding UpdatedVideo to form state:", updatedVideos);
    setFormData((prev) => ({
      ...prev,
      videos: [...prev.videos, video],
    }));
    console.log("Updated formData:", formData);
    console.log("Updated formData videos:", formData.videos);
  };

  const handleDeleteVideo = async (url: string) => {
    const updatedVideos = formData.videos.filter((v) => v.url !== url);
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((v) => v.url !== url),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", {
      ...formData,
      videos: formData.videos,
    }); // Debug log

    await onSubmit({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      imageUrl: formData.imageUrl,
      videoUrl: formData.videoUrl || "",
      gallery: formData.gallery,
      videos: formData.videos, // Explicitly include videos
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Main Image URL</Label>
          <Input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Video URL (optional)</Label>
          <Input
            name="videoUrl"
            value={formData.videoUrl || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Gallery Images</Label>
        <GalleryManager
          images={formData.gallery}
          onAdd={handleAddImage}
          onDelete={handleDeleteImage}
          isLoading={isLoading}
        />
      </div>

      <div className="space-y-4">
        <Label>Videos</Label>
        <VideoManager
          videos={formData.videos}
          onAdd={handleAddVideo}
          onDelete={handleDeleteVideo}
          isLoading={isLoading}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full button">
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {item ? "Updating..." : "Creating..."}
          </span>
        ) : item ? (
          "Update"
        ) : (
          "Create"
        )}
      </Button>
    </form>
  );
}
