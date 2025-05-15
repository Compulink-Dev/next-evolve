"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InteractiveFloorPlan from "../_components/FloorPlan";
import Image from "next/image";
import SessionLayout from "../_components/SessionWrapper";

export default function SelectBoothPage() {
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const router = useRouter();

  const handleBoothSubmit = async () => {
    if (!selectedBooth) return;
    const res = await fetch("/api/exhibitors", {
      method: "POST",
      body: JSON.stringify({ boothNumber: selectedBooth }),
    });

    if (res.ok) {
      router.push("/exhibitor/success");
    } else {
      alert("Booth already taken or error occurred.");
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
            <InteractiveFloorPlan
              onSelectBooth={(boothId) => setSelectedBooth(boothId)}
              selectedBooth={selectedBooth}
            />
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
