'use client'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import GalleryManager from './_components/GalleryManager';
import VideoManager from './_components/VideoManager';
import SummitForm from './_components/SummitForm';

type Event = {
  _id: string;
  year: string;
  title: string;
  description: string;
  gallery: string[];
  videos: { title: string; url: string }[];
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState({
    events: false,
    submit: false,
    delete: false,
    images: false,
    videos: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(prev => ({ ...prev, events: true }));
    try {
      const res = await fetch('/api/summit');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch events',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, events: false }));
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(prev => ({ ...prev, submit: true }));
    try {
      const url = selectedEvent 
        ? `/api/summit/${selectedEvent.year}` 
        : '/api/summit';
      const method = selectedEvent ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error(res.statusText);
      
      toast({
        title: 'Success',
        description: selectedEvent 
          ? 'Event updated successfully' 
          : 'Event created successfully',
      });
      
      // Reset form and refresh data
      setSelectedEvent(null);
      await fetchEvents();
      
      // If creating new, switch back to events tab
      if (!selectedEvent) {
        const eventsTab = document.querySelector('[data-value="events"]');
        if (eventsTab) (eventsTab as HTMLElement).click();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save event',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, submit: false }));
    }
  };

  const handleAddImage = async (year: string, imageUrl: string) => {
    setIsLoading(prev => ({ ...prev, images: true }));
    try {
      const res = await fetch(`/api/summit/${year}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          $push: { gallery: imageUrl } 
        }),
      });
      
      if (!res.ok) throw new Error(res.statusText);
      
      toast({
        title: 'Success',
        description: 'Image added to gallery',
      });
      
      await fetchEvents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add image',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, images: false }));
    }
  };
  
  const handleDeleteImage = async (year: string, imageUrl: string) => {
    setIsLoading(prev => ({ ...prev, images: true }));
    try {
      const res = await fetch(`/api/summit/${year}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          $pull: { gallery: imageUrl } 
        }),
      });
      
      if (!res.ok) throw new Error(res.statusText);
      
      toast({
        title: 'Success',
        description: 'Image removed from gallery',
      });
      
      await fetchEvents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, images: false }));
    }
  };

  
  const handleAddVideo = async (year: string, video: { title: string; url: string }) => {
    setIsLoading(prev => ({ ...prev, videos: true }));
    try {
      const event = events.find(e => e.year === year);
      if (!event) return;
      
      const updatedVideos = [...event.videos, video];
      const res = await fetch(`/api/summit/${year}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos: updatedVideos }),
      });
      
      if (!res.ok) throw new Error(res.statusText);
      
      toast({
        title: 'Success',
        description: 'Video added successfully',
      });
      
      await fetchEvents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add video',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, videos: false }));
    }
  };

  const handleDeleteVideo = async (year: string, videoUrl: string) => {
    setIsLoading(prev => ({ ...prev, videos: true }));
    try {
      const event = events.find(e => e.year === year);
      if (!event) return;
      
      const updatedVideos = event.videos.filter(v => v.url !== videoUrl);
      const res = await fetch(`/api/summit/${year}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos: updatedVideos }),
      });
      
      if (!res.ok) throw new Error(res.statusText);
      
      toast({
        title: 'Success',
        description: 'Video removed successfully',
      });
      
      await fetchEvents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete video',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, videos: false }));
    }
  };

  const handleDeleteEvent = async (year: string) => {
    setIsLoading(prev => ({ ...prev, delete: true }));
    try {
      const res = await fetch(`/api/summit/${year}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete');
      }
      
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
      
      await fetchEvents();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete event',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, delete: false }));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>
      
      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">
          {isLoading.events ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <p>No events found. Create one to get started.</p>
          ) : (
            events.map(event => (
              <div key={event._id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {event.title} ({event.year})
                  </h2>
                  <div className="space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedEvent(event)}
                      disabled={isLoading.submit}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteEvent(event.year)}
                      disabled={isLoading.delete}
                    >
                      {isLoading.delete ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </div>
                
                <GalleryManager
                  images={event.gallery}
                  onAdd={(url) => handleAddImage(event.year, url)}
                  onDelete={(url) => handleDeleteImage(event.year, url)}
                  isLoading={isLoading.images}
                />
                
                <VideoManager
                  videos={event.videos}
                  onAdd={(video) => handleAddVideo(event.year, video)}
                  onDelete={(url) => handleDeleteVideo(event.year, url)}
                  isLoading={isLoading.videos}
                />
              </div>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <SummitForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading.submit}
          />
        </TabsContent>
      </Tabs>
      
      {selectedEvent && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
          <SummitForm 
            event={selectedEvent} 
            onSubmit={handleSubmit} 
            isLoading={isLoading.submit}
          />
        </div>
      )}
    </div>
  );
}