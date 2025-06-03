"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Colors } from "@/constant/colors";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SpeakersForm from "./SpeakersForm";

interface SpeakerCardProps {
  id: string;
  name: string;
  company: string;
  position: string;
  bio: string;
  timeline: string;
  imageUrl: string;
  onDelete: (id: string) => void;
}

function SpeakerCard({
  id,
  name,
  company,
  position,
  bio,
  imageUrl,
  onDelete,
  timeline,
}: SpeakerCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl || "/placeholder-speaker.jpg"}
          alt={name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-1">{position}</p>
        <p className="text-sm font-medium mb-2">{company}</p>
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">{bio}</p>
        <div className="flex space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                style={{ backgroundColor: Colors.blue }}
                className="text-white"
              >
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Speaker</DialogTitle>
              </DialogHeader>
              <SpeakersForm
                initialData={{
                  name,
                  company,
                  position,
                  bio,
                  imageUrl,
                  timeline,
                }}
                isEdit
                id={id}
                onSuccess={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Button onClick={() => onDelete(id)} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SpeakerCard;
