"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function GalleryManager({
  images,
  onAdd,
  onDelete,
  isLoading,
}: {
  images: string[];
  onAdd: (url: string) => Promise<void>;
  onDelete: (url: string) => Promise<void>;
  isLoading?: boolean;
}) {
  const [newImage, setNewImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleAdd = async () => {
    if (!newImage) return;
    try {
      await onAdd(newImage);
      setNewImage("");
    } catch (error) {
      console.error("Failed to add image:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/gallery-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Submitting data:", data);
      await onAdd(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add to Gallery</Label>
        <div className="flex gap-2">
          <Input
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Image URL"
            disabled={isLoading || isUploading}
          />
          <Button
            className="button"
            onClick={handleAdd}
            disabled={isLoading || isUploading || !newImage}
          >
            Add URL
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="file-upload" className="cursor-pointer">
            <Button
              variant="outline"
              asChild
              disabled={isLoading || isUploading}
            >
              <span>Upload File</span>
            </Button>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
              disabled={isLoading || isUploading}
            />
          </Label>
          {isUploading && (
            <span className="text-sm text-gray-500">Uploading...</span>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={image}
                alt={`Gallery image ${index}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDelete(image)}
                disabled={isLoading}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
