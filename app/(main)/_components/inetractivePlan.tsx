"use client";
import Title from "./title";

interface Props {
  selectedBooth: string | null;
  approvedBooths: string[];
}

export default function InteractiveFloorPlan({
  selectedBooth,
  approvedBooths,
}: Props) {
  const boothCount = 66;
  const boothsPerRow = 10;

  return (
    <div className="p-6 bg-purple-950">
      <div className="mb-6">
        <Title title={"Exhibitor's Booth"} />
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-white">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-800 mr-2 rounded-sm"></div>
          <span>Your Booth</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-500 mr-2 rounded-sm"></div>
          <span>Taken Booths</span>
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

                const isApproved = approvedBooths.includes(boothNumber);
                const isSelected = selectedBooth === boothNumber;

                let boothClass =
                  "w-12 h-12 m-1 rounded-md flex items-center justify-center ";
                if (isApproved) {
                  boothClass += "bg-gray-500 text-white";
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
                      isApproved
                        ? `Booth ${boothNumber} is taken`
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
  );
}
