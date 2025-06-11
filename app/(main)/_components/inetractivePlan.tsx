"use client";
import Title from "./title";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Exhibitor {
  userId: {
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
  } | null;
  boothNumber: string;
  status: string;
}

interface Props {
  selectedBooth: string | null;
  approvedBooths: string[];
}

export default function InteractiveFloorPlan({
  selectedBooth,
  approvedBooths,
}: Props) {
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const boothCount = 66;
  const boothsPerRow = 10;

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/exhibitors");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExhibitors(data.exhibitors || []);
      } catch (err) {
        console.error("Failed to fetch exhibitors:", err);
        setError("Failed to load exhibitor data");
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitors();
  }, []);

  // Create a map of booth numbers to exhibitor info for quick lookup
  const boothToExhibitorMap: Record<string, Exhibitor> = {};
  exhibitors.forEach((exhibitor) => {
    boothToExhibitorMap[exhibitor.boothNumber] = exhibitor;
  });

  const getExhibitorInfo = (boothNumber: string) => {
    const exhibitor = boothToExhibitorMap[boothNumber];
    if (!exhibitor || !exhibitor.userId) return null;

    const company = exhibitor.userId.company || "No company";
    const firstName = exhibitor.userId.firstName || "";
    const lastName = exhibitor.userId.lastName || "";

    const name = `${firstName} ${lastName}`.trim();

    return {
      info: name ? `${company} (${name})` : company,
      status: exhibitor.status,
    };
  };

  if (loading) {
    return <div className="p-6 text-white">Loading booth information...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-purple-950">
      <div className="mb-6">
        <Title title={"Exhibitor's Booth"} />
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-8">
        {/* Left side - Booth Grid */}
        <div className="lg:w-1/2">
          {/* Legend */}
          <div className="flex gap-4 mb-6 text-white">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-800 mr-2 rounded-sm"></div>
              <span>Your Booth</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-500 mr-2 rounded-sm"></div>
              <span>Approved Booths</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 mr-2 rounded-sm"></div>
              <span>Pending Booths</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300 mr-2 rounded-sm"></div>
              <span>Available Booths</span>
            </div>
          </div>

          {/* Booth Grid */}
          <div className="overflow-x-auto">
            {Array.from({ length: Math.ceil(boothCount / boothsPerRow) }).map(
              (_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex mb-2">
                  {Array.from({ length: boothsPerRow }).map((_, colIndex) => {
                    const boothNumber = `G${rowIndex * boothsPerRow + colIndex + 1}`;
                    if (boothNumber > `G${boothCount}`) return null;

                    const exhibitorData = getExhibitorInfo(boothNumber);
                    const isApproved = exhibitorData?.status === "approved";
                    const isPending = exhibitorData?.status === "pending";
                    const isSelected = selectedBooth === boothNumber;

                    let boothClass =
                      "w-12 h-12 m-1 rounded-md flex items-center justify-center ";
                    if (isApproved) {
                      boothClass += "bg-gray-500 text-white";
                    } else if (isPending) {
                      boothClass += "bg-yellow-500 text-white";
                    } else if (isSelected) {
                      boothClass += "bg-purple-800 text-white";
                    } else {
                      boothClass += "bg-gray-300 text-gray-800";
                    }

                    return (
                      <div
                        key={boothNumber}
                        className={boothClass}
                        title={
                          exhibitorData
                            ? exhibitorData.status === "approved"
                              ? `Approved: ${exhibitorData.info}`
                              : `Pending approval: ${boothNumber}`
                            : isSelected
                              ? `Your booth: ${boothNumber}`
                              : `Booth ${boothNumber} is available`
                        }
                      >
                        {boothNumber}
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>

          {selectedBooth && (
            <div className="mt-6 text-white">
              <p className="text-lg font-semibold">
                Your assigned booth: {selectedBooth}
              </p>
            </div>
          )}
        </div>

        {/* Right side - Sitemap Image */}
        <div className="lg:w-1/2">
          <div className="sticky top-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/floor_plan_page_1.png"
                alt="Exhibition Hall Floor Plan"
                width={800}
                height={600}
                className="w-full h-auto rounded"
                priority
              />
              {selectedBooth && (
                <div className="mt-4 text-center text-purple-900 font-medium">
                  <p>Your booth ({selectedBooth}) is highlighted on the map</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
