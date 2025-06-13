"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import Title from "@/app/(main)/_components/title";

interface Sponsor {
  _id: string;
  name: string;
  link: string;
  type: "sponsor" | "endorsement" | "media";
  imageUrl: string;
}

export default function SponsorCarousel() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch("/api/sponsor");
        const data = await res.json();
        setSponsors(data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (!sponsors.length)
    return <p className="text-center text-white">No sponsors available.</p>;

  return (
    <div className="bg-purple-950 p-10 overflow-hidden">
      <Title title="Our Sponsors" />
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          spaceBetween={30}
          slidesPerView={3} // Set initial number of visible slides
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {sponsors.map((sponsor) => (
            <SwiperSlide key={sponsor._id}>
              <div className="flex justify-center">
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white p-4 rounded-xl shadow-lg w-40 h-40 flex items-center justify-center">
                    <Image
                      src={sponsor.imageUrl}
                      alt={sponsor.name}
                      width={120}
                      height={120}
                      className="object-contain max-h-[120px]"
                    />
                  </div>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
