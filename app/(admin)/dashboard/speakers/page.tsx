import Title from "@/components/Title";
import React from "react";
import SpeakersForm from "./_components/SpeakersForm";
import { Button } from "@/components/ui/button";
import SpeakerCard from "./_components/SpeakerCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Colors } from "@/constant/colors";

async function getSpeakers() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
    const res = await fetch(`${baseUrl}/speakers`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch speakers");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { speakers: [] };
  }
}

export default async function Speakers() {
  const { speakers } = await getSpeakers();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <Title name="Speakers" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="button hover:bg-pruple-400">
              Create Speaker
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Speaker</DialogTitle>
            </DialogHeader>
            <SpeakersForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker: any) => (
          <SpeakerCard
            key={speaker._id}
            id={speaker._id}
            name={speaker.name}
            company={speaker.company}
            position={speaker.position}
            bio={speaker.bio}
            imageUrl={speaker.imageUrl}
            timeline={speaker.timeline}
            onDelete={async (id) => {
              "use server";
              const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
              await fetch(`${baseUrl}/speakers?id=${id}`, {
                method: "DELETE",
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
