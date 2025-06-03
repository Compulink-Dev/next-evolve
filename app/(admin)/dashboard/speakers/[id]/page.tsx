import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SpeakersFrom from "../_components/SpeakersForm";

async function getSpeakerById(id: string) {
  try {
    const res = await fetch(`${process.env.API_ROUTE}/api/speakers/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch speaker");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { speaker: null };
  }
}

export default async function Speaker({ params }: { params: { id: string } }) {
  const { speaker } = await getSpeakerById(params.id);

  if (!speaker) {
    return <div className="p-8">Speaker not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Speaker</h1>
      <SpeakersFrom
        initialData={{
          name: speaker.name,
          company: speaker.company,
          position: speaker.position,
          bio: speaker.bio,
          imageUrl: speaker.imageUrl,
          timeline: speaker.timeline,
        }}
        isEdit
        id={params.id}
      />
    </div>
  );
}
