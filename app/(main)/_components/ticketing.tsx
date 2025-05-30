"use client";
import React, { useState } from "react";
import Title from "./title";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Badge component for ticket details
const Badge = ({ title }: any) => {
  return (
    <div className="flex items-center gap-4">
      <BadgeCheck className="hover:animate-spin delay-75" />
      <p className="">{title}</p>
    </div>
  );
};

// TicketCard component with dynamic data
const TicketCard = ({
  type,
  price,
  perks,
  isSponsor = false,
}: {
  type: string;
  price: string;
  perks: string[];
  isSponsor?: boolean;
}) => {
  return (
    <div className="bg-[#191970] hover:animate-pulse delay-200 hover:bg-purple-800 p-8 rounded-2xl text-slate-400">
      <div className="">
        <div className="py-1 px-2 w-auto bg-purple-600 rounded">
          <div className="">{type}</div>
        </div>
        <div className="text-5xl font-bold my-6">
          <p className="">
            {price}
            {/* <span className="pl-2 text-sm">/event</span> */}
          </p>
        </div>
        <p className="">For the event</p>
        <div className="mt-20 space-y-8">
          {perks.map((perk, index) => (
            <Badge key={index} title={perk} />
          ))}
        </div>
        <Link href={"/selection"}>
          <Button className="bg-blue-600 hover:bg-blue-400 mt-8 w-full">
            {isSponsor ? "Partner with us" : "Buy a Ticket"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Ticketing component with tabs for different categories
function Ticketing() {
  const [activeTab, setActiveTab] = useState("delegates");

  // Different packages for different tabs
  const ticketPackages = {
    delegates: [
      {
        type: "Early Bird: before 30th of April",
        price: "$150",
        perks: ["Regular Seating", "Lunch provided"],
      },
      {
        type: "Early Bird: before 30th of May",
        price: "$175",
        perks: ["Regular Seating", "Lunch provided"],
      },
      {
        type: "1st of June onwards",
        price: "$200",
        perks: ["Regular Seating", "Lunch provided"],
      },
    ],
    sponsors: [
      {
        type: "Platinum Sponsorship",
        price: "$15 000",
        perks: [
          "15 Delegates",
          "Logo Placement",
          "Co-Naming rights",
          "Logo on all advertising",
          "Logo on screen in the conference main auditorium and Break Away",
          "Crew Shirts Co-branded",
          "Logo on Conference packs.",
          "Banners inside and outside the venue.",
          "15 Delegate tickets.",
          "6 x 6 Exhibition Space at the Venue",
          "Name mentions on all radio and online advertising.",
        ],
      },
      {
        type: "Gold Sponsorship",
        price: "$10 00",
        perks: [
          "Logo on all advertising as gold sponsor.",
          "Logo on screen in the conference main auditorium",
          "Banners inside and outside the venue.",
          "10 Delegate tickets.",
          "3 x 3 m Exhibition Space at the Venue.",
          "Logo on all online advertising",
        ],
      },
      {
        type: "Silver Sponsorship",
        price: "$7 500",
        perks: [
          "Logo on all advertising as silver sponsor.",
          "Logo on screen in the conference main auditorium as silver sponsor.",
          "Speciﬁc number of banners inside and outside the venue.",
          "7 Delegate tickets.",
          "3 x 3 m Exhibition Space at the venue",
          "Logo on all online advertising.",
        ],
      },
      {
        type: "Bronze Sponsorship",
        price: "$5 00",
        perks: [
          "Logo on screen in the conference main auditorium.",
          "Banners inside and outside the venue",
          "5 Delegate tickets.",
          "Logo on all online advertising as bronze sponsor",
        ],
      },
    ],
    exhibitors: [
      {
        type: "Exhibitor Booth",
        price: "$1000",
        perks: ["Partnership", "10 Exhibitor Passes"],
      },
      {
        type: "Innovators Hub",
        price: "$200",
        perks: ["3 x 3 Booth", "5 Exhibitor Passes", "Marketing Materials"],
      },
    ],
    students: [
      {
        type: "Student Pass",
        price: "$30",
        perks: ["Including Lunch", "Half day session access on Friday the 4th"],
      },
    ],
  };

  return (
    <div className="bg-blue-950 p-8">
      <div className="text-slate-400 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="">
          <Title title="TICKET PRICING" />
          <p className="text-4xl tracking-widest font-bold">
            Event Pass & Tickets
          </p>
        </div>
        <div className="">
          <p className="">
            Like previous summit, we are arranging world Evolve summit 2025.
            It’s the gathering of all the big and amazing I.C.T & branding minds
            from all over the world.
          </p>
        </div>
      </div>

      {/* Tabs for different categories */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-2 text-slate-400">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "delegates"
                ? "bg-purple-800 text-black"
                : "bg-purple-600"
            }`}
            onClick={() => setActiveTab("delegates")}
          >
            Tickets
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "sponsors"
                ? "bg-purple-800 text-black"
                : "bg-purple-600"
            }`}
            onClick={() => setActiveTab("sponsors")}
          >
            Sponsors
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "exhibitors"
                ? "bg-purple-800 text-black"
                : "bg-purple-600"
            }`}
            onClick={() => setActiveTab("exhibitors")}
          >
            Exhibitors
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "students"
                ? "bg-purple-800 text-black"
                : "bg-purple-600"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
        </div>

        {/* Displaying the relevant ticket packages based on activeTab */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            //@ts-ignore
            ticketPackages[activeTab].map((ticket, index) => (
              <TicketCard
                key={index}
                type={ticket.type}
                price={ticket.price}
                perks={ticket.perks}
                isSponsor={activeTab === "sponsors"}
              />
            ))
          }
        </div>
        <p className="my-8 text-white text-2xl text-center animate-pulse">
          The 30th of June 2025 is the cut off date for registration and
          payment.
        </p>
      </div>
    </div>
  );
}

export default Ticketing;
