'use client'
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SpeakerCard from "./spaeker-card";

// Speaker array containing multiple speaker details
const speakers = [
    {
        name: "Edward Nyamuda",
        bio: "Edward is a seasoned software engineer with 10 years of experience in web development.",
        talkTitle: "The Future of Web Development",
        profileImageUrl: "/enyamuda.png",
    },
    {
        name: "Dr. Mboweni",
        bio: "Mboweni is a DevOps expert and has been working in the field for over 8 years.",
        talkTitle: "Scaling Infrastructure for Modern Applications",
        profileImageUrl: "/mboweni.png",
    },
    {
        name: "Prudence",
        bio: "Prudence specializes in AI and machine learning, with a focus on ethical AI development.",
        talkTitle: "AI in the Modern World: Ethics and Innovation",
        profileImageUrl: "/prudence.png",
    },
];

export default function Speakers() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState<{
        name: string;
        bio: string;
        talkTitle: string;
        profileImageUrl: string;
    } | null>(null);

    const openModal = (speaker: { name: string; bio: string; talkTitle: string; profileImageUrl: string }) => {
        setCurrentSpeaker(speaker);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentSpeaker(null);
    };

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {/* Map through the speakers array to render SpeakerCard for each speaker */}
            {speakers.map((speaker, index) => (
                <SpeakerCard
                    key={index}
                    name={speaker.name}
                    bio={speaker.bio}
                    talkTitle={speaker.talkTitle}
                    profileImageUrl={speaker.profileImageUrl}
                    onLearnMore={() => openModal(speaker)}
                />
            ))}

            {/* AlertDialog for Speaker Details */}
            <AlertDialog open={isModalOpen} onOpenChange={closeModal}>
                <AlertDialogTrigger />
                {currentSpeaker && (
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{currentSpeaker.name}</AlertDialogTitle>
                            <AlertDialogDescription>{currentSpeaker.talkTitle}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="mt-4">
                            <Image
                                src={currentSpeaker.profileImageUrl}
                                alt={currentSpeaker.name}
                                width={400}
                                height={200}
                                className="object-contain w-full h-48"
                            />
                            <p className="mt-4">{currentSpeaker.bio}</p>
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
