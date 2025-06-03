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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SpeakerCardProps {
  id: string;
  name: string;
  company: string;
  position: string;
  bio: string;
  imageUrl: string;
  timeline: string;
}

function SpeakerCard({
  id,
  name,
  company,
  position,
  bio,
  imageUrl,
  timeline,
}: SpeakerCardProps) {
  const [open, setOpen] = useState(false);

  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

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
              <Button className="text-white button">View Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[200vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{name}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={imageUrl}
                    className="h-[300px] w-[200px] object-contain"
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold">{position}</h4>
                    <Badge variant="outline" className="mt-1 p-3">
                      {company}
                    </Badge>
                  </div>
                  <ScrollArea className="h-72 w-full rounded-md border p-6">
                    <div className="prose prose-sm max-w-none">
                      <h5 className="font-medium text-gray-900">About</h5>
                      <p className="text-gray-600">{bio}</p>
                    </div>
                  </ScrollArea>

                  <div className="pt-4">
                    <Button className="button" onClick={() => setOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default SpeakerCard;
