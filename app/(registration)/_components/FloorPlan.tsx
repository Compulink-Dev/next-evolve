"use client";
import { useState } from "react";

interface Props {
  onSelectBooth: (id: string) => void;
  selectedBooth: string | null;
}

export default function InteractiveFloorPlan({
  onSelectBooth,
  selectedBooth,
}: Props) {
  const initialGridItems = Array.from({ length: 66 }, (_, i) => ({
    id: `G${i + 1}`,
    isTaken: false,
  }));

  const [gridItems, setGridItems] = useState(initialGridItems);
  const [showGridDialog, setShowGridDialog] = useState(true); // open by default

  const handleSelect = (id: string) => {
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
          {row.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-12 h-12 m-1 rounded-md text-white 
                  ${selectedBooth === item.id ? "bg-blue-500" : "bg-red-500"}
                `}
            >
              {item.id}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
