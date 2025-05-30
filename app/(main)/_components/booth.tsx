"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import InteractiveFloorPlan from "./inetractivePlan";

export default function ExhibitorBoothPage() {
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const [approvedBooths, setApprovedBooths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBoothData = async () => {
      setIsLoading(true);
      try {
        // Fetch approved booths
        const exhibitorsRes = await fetch("/api/exhibitors");
        if (exhibitorsRes.ok) {
          const exhibitorsData = await exhibitorsRes.json();
          setApprovedBooths(
            exhibitorsData.exhibitors?.map((e: any) => e.boothNumber) || []
          );
        }

        // Fetch user's booth if logged in
        if (session?.user) {
          const myBoothRes = await fetch("/api/my-booth");
          if (myBoothRes.ok) {
            const myBoothData = await myBoothRes.json();
            setSelectedBooth(myBoothData.boothNumber);
          }
        }
      } catch (error) {
        console.error("Failed to fetch booth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoothData();
  }, [session]);

  if (isLoading) {
    return <div>Loading booth information...</div>;
  }

  return (
    <div className="">
      <InteractiveFloorPlan
        selectedBooth={selectedBooth}
        approvedBooths={approvedBooths}
      />
    </div>
  );
}
