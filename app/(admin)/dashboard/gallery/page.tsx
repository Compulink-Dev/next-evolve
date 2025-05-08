"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import GalleryForm from "./_components/GalleryForm";

type GalleryItem = {
  _id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
  videoUrl?: string;
  gallery: string[];
  videos: { title: string; url: string }[];
};

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState({
    items: false,
    submit: false,
    delete: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setIsLoading((prev) => ({ ...prev, items: true }));
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch gallery items",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, items: false }));
    }
  };

  const handleSubmit = async (data: any) => {
    console.log("Submitting data:", data); // Debug log
    setIsLoading((prev) => ({ ...prev, submit: true }));
    try {
      const url = selectedItem
        ? `/api/gallery/${selectedItem._id}`
        : "/api/gallery";
      const method = selectedItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          videos: data.videos || [], // Ensure videos is always an array
        }),
      });

      const result = await res.json();
      console.log("Server response:", result); // Debug log

      if (!res.ok) throw new Error(result.error || "Failed to save");

      toast({
        title: "Success",
        description: selectedItem
          ? "Gallery item updated successfully"
          : "Gallery item created successfully",
      });

      setSelectedItem(null);
      await fetchGalleryItems();

      if (!selectedItem) {
        const itemsTab = document.querySelector('[data-value="items"]');
        if (itemsTab) (itemsTab as HTMLElement).click();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to save gallery item",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const handleDeleteItem = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, delete: true }));
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete");
      }

      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });

      await fetchGalleryItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete gallery item",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Gallery Items</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          {isLoading.items ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading gallery items...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <p>No gallery items found. Create one to get started.</p>
          ) : (
            galleryItems.map((item) => (
              <div key={item._id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedItem(item)}
                      disabled={isLoading.submit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteItem(item._id)}
                      disabled={isLoading.delete}
                    >
                      {isLoading.delete ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Main Image</h3>
                    {item.imageUrl && (
                      <div className="relative aspect-video">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="rounded-md object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {item.videoUrl && (
                    <div>
                      <h3 className="font-medium mb-2">Featured Video</h3>
                      <div className="aspect-video">
                        <iframe
                          src={item.videoUrl}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  <p>{item.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="create">
          <GalleryForm onSubmit={handleSubmit} isLoading={isLoading.submit} />
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Gallery Item</h2>
          <GalleryForm
            item={{
              ...selectedItem,
              date: selectedItem.date.toISOString(), // 👈 Convert Date to ISO string
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading.submit}
          />
        </div>
      )}
    </div>
  );
}
