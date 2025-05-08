"use client";
import React, { useState, useEffect } from "react";
import GalleryPad from "./GalleryPad";
import Title from "../../_components/title";

function GalleryCard() {
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch("/api/gallery/client");
        const data = await response.json();
        setGalleryData(data);

        // Extract all images from gallery items
        const allImages = data.flatMap((item: any) =>
          item.gallery.map((img: string) => ({
            id: `${item._id}-${img}`,
            src: img,
            alt: item.title,
          }))
        );
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleryData();
  }, []);

  return (
    <div className="mt-8">
      <div className="">
        <Title title="Gallery" />
      </div>
      <div className="">
        {images.length > 0 ? (
          <GalleryPad images={images} />
        ) : (
          <p>No gallery images found</p>
        )}
      </div>
    </div>
  );
}

export default GalleryCard;
