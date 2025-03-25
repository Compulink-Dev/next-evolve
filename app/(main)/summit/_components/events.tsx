'use client'
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const events = [
    {
        id: "2024",
        title: "Evolve Summit 2024",
        description: "The premier tech conference of the year featuring industry leaders and innovative workshops.",
        date: "April 20, 2024",
        imageUrl: "/evolve.png",
    },

];

export default function PreviousEvents() {
    const router = useRouter();

    const handleEventClick = (eventId: string) => {
        router.push(`/summit/${eventId}`);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Previous Events</h2>
            <p className="text-slate-300">Relive our past conferences and events</p>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div 
                        key={event.id} 
                        className="bg-purple-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => handleEventClick(event.id)}
                    >
                        <div className="relative h-48">
                            <Image
                                src={event.imageUrl}
                                alt={event.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-purple-200 mb-4">{event.date}</p>
                            <p className="text-slate-300 mb-4 line-clamp-2">{event.description}</p>
                            <Button 
                                variant="outline" 
                                className="w-full text-purple-900 bg-white hover:bg-purple-100"
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}