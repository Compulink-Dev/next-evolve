"use client";
import { useState } from "react";

interface Props {
  onSelectBooth: (id: string) => void;
  selectedBooth: string | null;
  approvedBooths: string[];
}

export default function InteractiveFloorPlan({
  onSelectBooth,
  selectedBooth,
  approvedBooths,
}: Props) {
  const initialGridItems = Array.from({ length: 66 }, (_, i) => ({
    id: `G${i + 1}`,
    isTaken: false,
  }));

  const [gridItems, setGridItems] = useState(initialGridItems);
  const [showGridDialog, setShowGridDialog] = useState(true); // open by default

  const handleSelect = (id: string) => {
    if (approvedBooths.includes(id)) return;
    onSelectBooth(id);
  };

  const groupedItems = [];
  for (let i = 0; i < gridItems.length; i += 10) {
    groupedItems.push(gridItems.slice(i, i + 10));
  }

  return (
    <div>
      {groupedItems.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex mb-2">
          {row.map((item) => {
            const isApproved = approvedBooths.includes(item.id);
            const isSelected = selectedBooth === item.id;

            let buttonClass = "w-12 h-12 m-1 rounded-md text-white ";
            if (isApproved) {
              buttonClass += "bg-gray-500 cursor-not-allowed";
            } else if (isSelected) {
              buttonClass += "bg-purple-800";
            } else {
              buttonClass += "bg-red-500 hover:bg-red-600";
            }

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={buttonClass}
                disabled={isApproved}
                title={isApproved ? "This booth is already taken" : ""}
              >
                {item.id}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
