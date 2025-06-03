import React from "react";
import SpeakerCard from "./SpeakerCard";

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
          />
        ))}
      </div>
    </div>
  );
}
