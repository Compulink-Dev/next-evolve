import React from "react";
import SpeakerCard from "./speakerCards";
import Title from "./title";

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

  // Separate speakers by timeline
  const fullDaySpeakers = speakers.filter(
    (speaker: any) => speaker.timeline === "Full Day"
  );
  const halfDaySpeakers = speakers.filter(
    (speaker: any) => speaker.timeline === "Half Day"
  );

  // Modern section title component
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="relative my-12">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white rounded-lg px-4 text-lg font-bold text-gray-900">
          {children}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-purple-900">
      <div className="mb-8">
        <Title title="Speakers" />
      </div>
      {/* Full Day Speakers Section */}
      {fullDaySpeakers.length > 0 && (
        <>
          <SectionTitle>Conference Speakers</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {fullDaySpeakers.map((speaker: any) => (
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
        </>
      )}

      {/* Half Day Speakers Section */}
      {halfDaySpeakers.length > 0 && (
        <>
          <SectionTitle>Half-Day Students Conference Speakers</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {halfDaySpeakers.map((speaker: any) => (
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
        </>
      )}
    </div>
  );
}
