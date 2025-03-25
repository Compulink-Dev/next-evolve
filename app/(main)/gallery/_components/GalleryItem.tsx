'use client'
import { FC, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog';
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="cursor-pointer">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={300}
                            height={200}
                            className="rounded-lg shadow-lg object-cover w-full h-full hover:animate-ping"
                            style={{ animationDuration: '3s' }}
                        />
                    </div>
                </DialogTrigger>

                {/* Full-screen dialog */}
                <DialogOverlay className="fixed inset-0 text-white bg-purple/10 backdrop-blur-sm z-50" />
                <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-0 m-0 max-w-none w-full h-full">
                    <div className="relative w-full h-full bg-purple-950 flex items-center justify-center">
                        {/* Close Button - positioned at top-right corner */}
                        <DialogClose asChild>
                            <Button
                                variant={'ghost'}
                                size={'icon'}
                                className="absolute top-4 right-4 text-white hover:bg-white/10 z-50 rounded-full p-2"
                                aria-label="Close"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>

                        {/* Image Container - centered with max dimensions */}
                        <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] p-4 flex items-center justify-center">
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