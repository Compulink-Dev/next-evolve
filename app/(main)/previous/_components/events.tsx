'use client'
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
import EventCard from "./event-card";
import { Button } from "@/components/ui/button";

// Array containing multiple event details
const events = [
    {
        title: "Evolve 2024",
        description: "Join us for a day of insightful talks and networking with industry leaders.",
        date: "April 20, 2024",
        imageUrl: "/evolve.png",
    },
    // Add more events as needed
];

export default function Home() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<{
        title: string;
        description: string;
        date: string;
        imageUrl: string;
    } | null>(null);

    const openModal = (event: { title: string; description: string; date: string; imageUrl: string }) => {
        setCurrentEvent(event);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentEvent(null);
    };

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Map through the events array to render EventCard for each event */}
            {events.map((event, index) => (
                <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    imageUrl={event.imageUrl}
                    onLearnMore={() => openModal(event)}
                />
            ))}

            {/* AlertDialog for Event Details */}
            <AlertDialog open={isModalOpen} onOpenChange={closeModal}>
                <AlertDialogTrigger />
                {currentEvent && (
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{currentEvent.title}</AlertDialogTitle>
                            <AlertDialogDescription>{currentEvent.date}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="mt-4">
                            <Image
                                src={currentEvent.imageUrl}
                                alt={currentEvent.title}
                                width={400}
                                height={200}
                                className="object-contain w-full h-48"
                            />
                            <p className="mt-4">{currentEvent.description}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button variant="outline" onClick={closeModal}>
                                Close
                            </Button>
                        </div>
                    </AlertDialogContent>
                )}
            </AlertDialog>
        </div>
    );
}
