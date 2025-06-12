"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

interface Sponsor {
  _id: string;
  name: string;
  link: string;
  type: "sponsor" | "endorsement" | "media";
  imageUrl: string;
}

export default function SponsorCarousel() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const res = await fetch("/api/sponsors");
      const data = await res.json();
      setSponsors(data);
    };
    fetchSponsors();
  }, []);

  if (!sponsors.length)
    return <p className="text-center text-white">No sponsors available.</p>;

  return (
    <div className="bg-purple-950 py-10">
      <h2 className="text-2xl text-white text-center mb-6">Our Sponsors</h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={3}
        loop
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {sponsors.map((sponsor) => (
          <SwiperSlide key={sponsor._id} className="flex justify-center">
            <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
              <div className="bg-white p-4 rounded-xl shadow-lg w-40 h-40 flex items-center justify-center">
                <Image
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
