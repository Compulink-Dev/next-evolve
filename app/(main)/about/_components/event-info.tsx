"use client";
import Title from "@/components/Title";
import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function EventInfo() {
  // Event data
  const events = [
    {
      id: "event1",
      name: "Day 1",
      image: "/event1.png",
      pdf: "/home/program.pdf", // PDF in public folder
      description: "Details about the first event",
    },
    {
      id: "event2",
      name: "Day 2",
      image: "/event2.png",
      pdf: "/home/program.pdf", // PDF in public folder
      description: "Details about the second event",
    },
  ];

  // Download function
  const downloadPdf = (pdfPath: string) => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = pdfPath.split("/").pop() || "event.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-purle-900">
      <div className="mb-6">
        <Title name="Events" />
      </div>

      <Tabs defaultValue={events[0].id}>
        <TabsList className="grid w-full grid-cols-2">
          {events.map((event) => (
            <TabsTrigger key={event.id} value={event.id}>
              {event.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {events.map((event) => (
          <TabsContent key={event.id} value={event.id}>
            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
              <p className="text-muted-foreground mb-6">{event.description}</p>

              <div className="flex flex-col items-center gap-6">
                <Image
                  src={event.image}
                  alt={event.name}
                  width={800}
                  height={450}
                  className="rounded-lg border"
                />

                <Button
                  onClick={() => downloadPdf(event.pdf)}
                  className="gap-2"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download {event.name} PDF
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default EventInfo;
