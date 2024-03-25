import { Colors } from "@/constant/colors";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdLocationPin } from "react-icons/md";

function Venue() {
  return (
    <div
      style={{ backgroundColor: Colors.primary }}
      className="bg-purple-300 my-8">
      <div className="container mx-auto max-w-7xl p-6 grid grid-cols-1 md:grid-cols-3 gap-2 ">
        <div className="flex gap-2 col-span-2">
          <Image unoptimized alt="" src="/hotel.jpg" width={500} height={500} />
          <div className="flex flex-col gap-2">
            <Image unoptimized alt="" src="/tower.jpg" width={300} height={300} />
            <Image unoptimized alt="" src="/hotel.jpg" width={300} height={300} />
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-start justify-between">
          <h1 className="text-2xl md:text-4xl font-bold text-white">Rainbow Towers</h1>
          <div
            style={{ color: Colors.white }}
            className="text-sm text-gray-700 mt-2">
            The Rainbow Towers Hotel & International Conference Centre is an
            international convention centre with unequalled conferencing
            capacity and is the venue of choice in Zimbabwe and Southern Africa.
            The 19 conference rooms range from small, medium to large conference
            rooms and a gigantic auditorium seating 4500. Royal purple and gold
            interiors lend an air of majesty, class and dignity to any event
            held here. The roomy marble floor entrance to the Conference Centre
            and its spacious, well-tended gardens also allow for outdoor
            exhibitions. For this reason we believe this is the choice of venue
            for the Evolve ICT Summit
          </div>
          <Link
            href="https://rtgafrica.com/rainbow-towers-hotel-conference-centre-hicc/"
            target="_blank"
            style={{ backgroundColor: Colors.blue }}
            className="flex gap-2 mt-4 items-center bg-purple-700 text-white px-4 rounded-sm py-2 hover:scale-95 transition duration-1000"
          >
            <MdLocationPin />
            <button className="text-sm">
              <div>
                View Location
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Venue;
