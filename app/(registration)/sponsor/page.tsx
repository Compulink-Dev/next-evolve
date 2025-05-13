"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

const sponsorshipTiers = [
  {
    name: "PLATINUM",
    price: "$15,000",
    features: [
      "Co-Naming rights",
      "Logo on all advertising",
      "Logo on screens in main auditorium and breakaway rooms",
      "Co-branded crew shirts",
      "Logo on conference packs",
      "Banners inside and outside venue",
      "15 Delegate tickets",
      "6m x 6m Exhibition Space",
      "Name mentions on all radio and online advertising",
    ],
    featured: true,
    color: "bg-gradient-to-br from-gray-200 to-gray-400",
    textColor: "text-gray-800",
  },
  {
    name: "GOLD",
    price: "$10,000",
    features: [
      "Logo on all advertising as gold sponsor",
      "Logo on screen in main auditorium",
      "Banners inside and outside venue",
      "10 Delegate tickets",
      "3m x 3m Exhibition Space",
      "Logo on all online advertising",
    ],
    featured: false,
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    textColor: "text-yellow-900",
  },
  {
    name: "SILVER",
    price: "$7,500",
    features: [
      "Logo on all advertising as silver sponsor",
      "Logo on screen as silver sponsor",
      "Banners inside and outside venue",
      "7 Delegate tickets",
      "3m x 3m Exhibition Space",
      "Logo on all online advertising",
    ],
    featured: false,
    color: "bg-gradient-to-br from-gray-300 to-gray-500",
    textColor: "text-gray-800",
  },
  {
    name: "BRONZE",
    price: "$5,000",
    features: [
      "Logo on screen in main auditorium",
      "Banners inside and outside venue",
      "5 Delegate tickets",
      "Logo on online advertising as bronze sponsor",
    ],
    featured: false,
    color: "bg-gradient-to-br from-amber-600 to-amber-800",
    textColor: "text-amber-100",
  },
];

function Sponsors() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900">
      <div className="absolute top-5 right-6">
        <Button
          onClick={() => router.push("/")}
          variant={"ghost"}
          size="icon"
          className="text-white"
        >
          <X />
        </Button>
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Sponsorship Opportunities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sponsorshipTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`${tier.featured ? "border-2 border-white scale-105" : ""} flex flex-col h-full`}
            >
              <CardHeader className={`${tier.color} ${tier.textColor} p-6`}>
                <CardTitle className="text-2xl font-bold text-center">
                  {tier.name} SPONSOR
                </CardTitle>
                <div className="text-3xl font-extrabold text-center mt-2">
                  {tier.price}
                </div>
              </CardHeader>

              <CardContent className="flex-grow p-6">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6">
                <Button
                  className={`w-full ${tier.featured ? "bg-white text-purple-900 hover:bg-gray-100" : "bg-purple-700 hover:bg-purple-600"}`}
                  size="lg"
                >
                  Become {tier.name} Sponsor
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Custom Sponsorship Packages Available
          </h2>
          <p className="max-w-2xl mx-auto mb-6">
            We can create tailored sponsorship opportunities to meet your
            specific marketing objectives and budget requirements.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="text-white border-white hover:bg-white hover:text-purple-900"
          >
            Contact Us for Custom Options
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
