"use client";
import { FC, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryItemProps {
  image: {
    id: string;
    src: string;
    alt: string;
  };
}

const GalleryItem: FC<GalleryItemProps> = ({ image }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="gallery-item">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={200}
              className="rounded-lg shadow-lg object-cover w-full h-[250px]"
            />
          </div>
        </DialogTrigger>

        {/* Full-screen overlay */}
        <DialogOverlay className="fixed inset-0 bg-purple-700/90 backdrop-blur-sm z-50" />

        {/* Dialog content - now properly centered */}
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[90vw] h-full max-h-[90vh] p-0 m-0 border-none bg-transparent data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="relative w-full h-full flex items-center justify-center ">
            {/* Close Button */}
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-50 rounded-full p-2"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </Button>
            </DialogClose>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryItem;
