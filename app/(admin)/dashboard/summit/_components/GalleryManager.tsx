'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

export default function GalleryManager({ 
  images, 
  onAdd, 
  onDelete,
  isLoading
}: {
  images: string[];
  onAdd: (url: string) => Promise<void>;
  onDelete: (url: string) => Promise<void>;
  isLoading?: boolean
}) {
  const [newImage, setNewImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleAdd = async () => {
    if (!newImage) return;
    await onAdd(newImage);
    setNewImage('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      await onAdd(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
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
          />
          <Button onClick={handleAdd}>Add URL</Button>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>Upload File</span>
            </Button>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </Label>
          {isUploading && <span>Uploading...</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group aspect-square">
            <Image
              src={image}
              alt={`Gallery image ${index}`}
              fill
              className="object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(image)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}