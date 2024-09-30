'use client'
import { FC, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog'; // Ensure correct import paths based on your project
import { DialogClose } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            {/* Dialog Trigger */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="cursor-pointer">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={300}
                            height={200}
                            className="rounded-lg shadow-lg object-cover w-full h-full hover:animate-ping"
                            style={{ animationDuration: '3s' }} // Set your desired duration
                        />
                    </div>
                </DialogTrigger>

                {/* Dialog Content */}
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
                <DialogContent className="fixed inset-0 flex items-center justify-center p-4 sm:p-8">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 md:p-6">
                        {/* Close Button */}
                        <DialogClose asChild>
                            <Button
                                variant={'outline'}
                                className="absolute top-0 left-0 text-gray-600 hover:text-gray-900 bg-transparent z-50 rounded-full p-1"
                                aria-label="Close"
                            >
                                <X />
                            </Button>
                        </DialogClose>

                        {/* Image */}
                        <div className="relative">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={1200}
                                height={800}
                                className="rounded-lg object-contain w-full h-auto"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GalleryItem;
