"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InteractiveFloorPlan from "../_components/FloorPlan";
import Image from "next/image";
import SessionLayout from "../_components/SessionWrapper";

export default function SelectBoothPage() {
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const [approvedBooths, setApprovedBooths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchApprovedBooths = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/exhibitors");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        console.log("Booth number :", data);

        const approved = data.exhibitors.map(
          (exhibitor: any) => exhibitor.boothNumber
        );
        setApprovedBooths(approved);
      } catch (error) {
        console.error("Failed to fetch approved booths:", error);
        // Optionally show error to user or retry
      } finally {
        setIsLoading(false);
      }
    };
    fetchApprovedBooths();
  }, []);

  const handleBoothSubmit = async () => {
    if (!selectedBooth) return;

    try {
      const res = await fetch("/api/exhibitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boothNumber: selectedBooth }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show specific error message from server if available
        alert(data.message || "Failed to reserve booth");
        return;
      }

      router.push("/exhibitor/success");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error occurred. Please try again.");
    }
  };

  return (
    <SessionLayout>
      <div className="">
        <div className="flex items-center justify-center gap-4">
          <div className="">
            <Image
              src="/floor_plan_page_1.png"
              alt="HICC Ground Floor Plan"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Choose Your Booth</h1>
            {isLoading ? (
              <div>Loading booth availability...</div>
            ) : (
              <InteractiveFloorPlan
                onSelectBooth={(boothId) => setSelectedBooth(boothId)}
                selectedBooth={selectedBooth}
                approvedBooths={approvedBooths}
              />
            )}
            <div className="mt-4">
              <button
                disabled={!selectedBooth}
                onClick={handleBoothSubmit}
                className="button text-white px-4 py-2 rounded"
              >
                Confirm Booth {selectedBooth}
              </button>
            </div>
          </div>
        </div>
      </div>
    </SessionLayout>
  );
}
