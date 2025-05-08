import Title from "@/app/(main)/_components/title";
import { Colors } from "@/constant/colors";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";
import { MdLocationPin } from "react-icons/md";

function Venue() {
  return (
    <div className="bg-purple-950">
      <div className="container mx-auto max-w-7xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col md:flex-row gap-4 col-span-2">
          <Image
            unoptimized
            alt="Main Venue"
            src="/hotel.jpg"
            width={500}
            height={500}
            className="w-full md:w-1/2 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="flex flex-col gap-4">
            <Image
              unoptimized
              alt="Tower"
              src="/tower.jpg"
              width={300}
              height={300}
              className="w-full rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              unoptimized
              alt="Hotel"
              src="/hotel.jpg"
              width={300}
              height={300}
              className="w-full rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col justify-between text-slate-400">
          <Title title="Rainbow Towers" />
          <p className="text-sm text-gray-700" style={{ color: Colors.white }}>
            The Rainbow Towers Hotel & International Conference Centre is an
            international convention centre with unparalleled conferencing
            capacity, making it the venue of choice in Zimbabwe and Southern
            Africa. The 19 conference rooms range from small to large, including
            a gigantic auditorium seating 4500. With royal purple and gold
            interiors, it adds an air of majesty, class, and dignity to any
            event. The spacious marble entrance and well-tended gardens also
            allow for outdoor exhibitions, making this the ideal venue for the
            Evolve ICT Summit.
          </p>
          <Link
            href="https://rtgafrica.com/rainbow-towers-hotel-conference-centre-hicc/"
            target="_blank"
            className="flex items-center gap-2 mt-4 bg-purple-700 text-white px-4 py-2 rounded-sm transition-transform duration-200 transform hover:scale-95"
            style={{ backgroundColor: Colors.blue }}
          >
            <MdLocationPin />
            <span className="text-sm">View Location</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Venue;
