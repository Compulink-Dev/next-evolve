'use client'
import { notFound } from 'next/navigation';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const eventData = {
    "2024": {
        title: "Evolve Summit 2024",
        description: "The premier tech conference of the year featuring industry leaders and innovative workshops. Over 500 attendees participated in this groundbreaking event.",
        date: "April 20, 2024",
        imageUrl: "/evolve.png",
        location: "H.I.C.C,  Harare Zimbabwe",
        highlights: [
            "15+ keynote speakers",
            "30+ technical workshops",
            "Networking sessions",
            "Startup showcase"
        ],
        gallery: [
            "/gallery1.jpg",
            "/gallery2.jpg",
            "/gallery3.jpg",
            "/gallery4.jpg"
        ],
        videos: [
            { title: "Opening Keynote", url: "https://youtube.com/embed/keynote123" },
            { title: "Panel Discussion", url: "https://youtube.com/embed/panel456" },
            { title: "Workshop Highlights", url: "https://youtube.com/embed/workshop789" }
        ]
    },
    // ... other events
};

export default function EventDetails({ params }: { params: { id: string } }) {
    const router = useRouter();
    const event = eventData[params.id as keyof typeof eventData];

    if (!event) {
        return notFound();
    }

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
                <p className="text-purple-300 text-xl mb-8">{event.date} • {event.location}</p>
                
                <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-contain"
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
                            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-700">
                                Gallery
                            </TabsTrigger>
                            <TabsTrigger value="videos" className="data-[state=active]:bg-purple-700">
                                Videos
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="gallery">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {event.gallery?.map((image, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={`Gallery image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="videos">
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
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}