'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function VideoManager({ 
  videos, 
  onAdd, 
  onDelete,
  isLoading
}: {
  videos: { title: string; url: string }[];
  onAdd: (video: { title: string; url: string }) => Promise<void>;
  onDelete: (url: string) => Promise<void>;
  isLoading?: boolean;
}) {
  const [newVideo, setNewVideo] = useState({
    title: '',
    url: ''
  });
  const { toast } = useToast();

  const convertToEmbedUrl = (url: string): string => {
    // If already an embed URL, return as-is
    if (url.includes('youtube.com/embed')) return url;
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handleAdd = async () => {
    if (!newVideo.title || !newVideo.url) {
      toast({
        title: 'Error',
        description: 'Please fill in both title and URL fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const embedUrl = convertToEmbedUrl(newVideo.url);
      await onAdd({
        title: newVideo.title,
        url: embedUrl
      });
      setNewVideo({ title: '', url: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add video',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add Video</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
          />
          <Input
            placeholder="YouTube URL"
            value={newVideo.url}
            onChange={(e) => setNewVideo({...newVideo, url: e.target.value})}
          />
        </div>
        <Button onClick={handleAdd} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Video'}
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Videos</Label>
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <h4 className="font-medium mb-2">{video.title}</h4>
              <div className="aspect-video w-full">
                <iframe
                  src={video.url}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
    </div>
  );
}