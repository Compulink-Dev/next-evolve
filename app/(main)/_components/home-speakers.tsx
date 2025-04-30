import Title from "@/components/NewTitle";
import SignOutButton from "@/components/SignOut";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface Speaker {
  name: string;
  position: string;
  company: string;
  image: string;
  facebookUrl?: string;
  twitterUrl?: string;
  whatsappUrl?: string;
  linkedinUrl?: string;
}

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="flex flex-col items-center justify-center text-slate-400 p-4 hover:shadow-2xl rounded">
      <div>
        <Image
          src={speaker.image}
          alt={speaker.name}
          width={200}
          height={200}
        />
      </div>
      <div className="text-center">
        <p className="my-4 text-lg font-bold">{speaker.name}</p>
        <p className="text-sm">
          {speaker.position}, {speaker.company}
        </p>
      </div>
      <div className="flex gap-4 items-center my-4">
        {speaker.facebookUrl && (
          <Link href={speaker.facebookUrl}>
            <Facebook size={20} />
          </Link>
        )}
        {speaker.twitterUrl && (
          <Link href={speaker.twitterUrl}>
            <Twitter size={20} />
          </Link>
        )}
        {speaker.whatsappUrl && (
          <Link href={speaker.whatsappUrl}>
            <FaWhatsapp />
          </Link>
        )}
        {speaker.linkedinUrl && (
          <Link href={speaker.linkedinUrl}>
            <Linkedin size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

function HomeSpeakers() {
  // Replace this with actual data
  const speakers: Speaker[] = [
    // Add speaker objects here or leave it empty for "no speakers" scenario
    // Example:
    // {
    //   name: "Thomas Miller",
    //   position: "CEO",
    //   company: "StemLady",
    //   image: "/guest.png",
    //   facebookUrl: "",
    //   twitterUrl: "",
    //   whatsappUrl: "",
    //   linkedinUrl: "",
    // }
  ];

  return (
    <div className="bg-purple-950">
      <SignOutButton />
      <div>
        <Title title="Our Amazing & Learned" subtitle="Event Speakers" />
        {speakers.length > 0 ? (
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {speakers.map((speaker, index) => (
              <SpeakerCard key={index} speaker={speaker} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-300 py-12">
            <p className="text-2xl font-bold">
              No speakers available at this time
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeSpeakers;
