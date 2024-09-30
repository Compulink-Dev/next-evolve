import { FC, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog'; // Ensure correct import paths based on your project
import { DialogClose } from '@radix-ui/react-dialog';

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
                            className="rounded-lg shadow-lg object-cover w-full h-full"
                        />
                    </div>
                </DialogTrigger>

                {/* Dialog Content */}
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 md:p-6">
                        {/* Close Button */}
                        <DialogClose asChild>
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-transparent rounded-full p-1"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </DialogClose>

                        {/* Centered Image */}
                        <div className="w-full flex justify-center">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={1200}
                                height={800}
                                className="rounded-lg object-contain w-full h-auto max-h-[80vh]"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GalleryItem;
