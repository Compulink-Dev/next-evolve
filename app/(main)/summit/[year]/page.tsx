"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Event = {
  _id: string;
  year: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  location: string;
  highlights: string[];
  gallery: string[];
  videos: { title: string; url: string }[];
};

export default function EventDetails({ params }: { params: { year: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/summit/${params.year}`);
        if (!res.ok) {
          throw new Error("Event not found");
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.year]);

  useEffect(() => {
    const checkVideoAccess = async () => {
      if (status === "authenticated" && event) {
        try {
          const res = await fetch(`/api/check-access?eventId=${event._id}`);
          const data = await res.json();
          setHasAccess(data.hasAccess);
        } catch (error) {
          console.error("Error checking access:", error);
        } finally {
          setCheckingAccess(false);
        }
      } else {
        setCheckingAccess(false);
      }
    };

    checkVideoAccess();
  }, [status, event]);

  if (loading) {
    return (
      <div className="bg-purple-950 text-white min-h-screen p-8 flex items-center justify-center">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return notFound();
  }

  const handlePurchaseAccess = () => {
    router.push(`/purchase?eventId=${event._id}`);
  };

  const handleLogin = () => {
    router.push("/login?callbackUrl=" + window.location.pathname);
  };

  return (
    <div className="bg-purple-950 text-white min-h-screen p-8">
      <Button
        variant="outline"
        className="bg-purple-900 hover:bg-purple-800 mb-8"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2" /> Back to Events
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
        <p className="text-purple-300 text-xl mb-8">
          {event.date} • {event.location}
        </p>

        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-6">
          <p className="text-slate-300 text-lg">{event.description}</p>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Event Highlights</h2>
            <ul className="space-y-3 mb-8">
              {event.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-slate-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery and Videos Tabs */}
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-900">
              <TabsTrigger
                value="gallery"
                className="data-[state=active]:bg-purple-700"
              >
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-purple-700"
              >
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {event.gallery?.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              {status === "loading" || checkingAccess ? (
                <div className="flex justify-center items-center h-40">
                  <p>Checking access...</p>
                </div>
              ) : !session ? (
                <Alert className="bg-purple-900 border-purple-700">
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Sign in required</AlertTitle>
                  <AlertDescription>
                    You need to be signed in to view the videos.
                    <Button
                      onClick={handleLogin}
                      className="ml-4"
                      variant="outline"
                    >
                      Sign In
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : !hasAccess ? (
                <Alert className="bg-purple-900 border-purple-700">
                  <Rocket className="h-4 w-4" />
                  <AlertTitle>Premium content</AlertTitle>
                  <AlertDescription>
                    You need to purchase access to view these videos.
                    <Button
                      onClick={handlePurchaseAccess}
                      className="ml-4"
                      variant="outline"
                    >
                      Purchase Access
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid gap-4 mt-4">
                  {event.videos?.map((video, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-medium">{video.title}</h3>
                      <div className="aspect-video w-full">
                        <iframe
                          src={video.url}
                          className="w-full h-full rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogOverlay className="fixed inset-0 bg-purple-900/80 backdrop-blur-sm z-50" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[90vw] h-full max-h-[90vh] p-0 m-0 border-none bg-transparent">
          <div className="relative w-full h-full flex items-center justify-center ">
            {/* Close Button */}
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-50 rounded-full p-2"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </Button>
            </DialogClose>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Enlarged gallery image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
